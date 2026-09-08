import crypto from "crypto";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getBookById } from "@/lib/catalog";

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !secret) return NextResponse.json({ success: false, message: "Payment service is not configured" }, { status: 503 });

    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookId } = body;
    if (![razorpay_order_id, razorpay_payment_id, razorpay_signature, bookId].every((value) => typeof value === "string" && value.length)) {
      return NextResponse.json({ success: false, message: "Missing payment fields" }, { status: 400 });
    }

    const expected = crypto.createHmac("sha256", secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
    const expectedBuffer = Buffer.from(expected, "utf8");
    const signatureBuffer = Buffer.from(razorpay_signature, "utf8");
    if (expectedBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) {
      return NextResponse.json({ success: false, message: "Invalid payment signature" }, { status: 400 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: secret });
    const [order, payment] = await Promise.all([
      razorpay.orders.fetch(razorpay_order_id),
      razorpay.payments.fetch(razorpay_payment_id)
    ]);

    const orderBookId = String(order.notes?.book_id || "");
    if (!orderBookId || orderBookId !== bookId || String(payment.order_id || "") !== razorpay_order_id) {
      return NextResponse.json({ success: false, message: "Payment does not match this book" }, { status: 400 });
    }

    const book = await getBookById(bookId);
    if (!book) return NextResponse.json({ success: false, message: "Book not found" }, { status: 404 });
    if (Number(order.amount) !== Math.round(book.price * 100) || Number(payment.amount) !== Math.round(book.price * 100)) {
      return NextResponse.json({ success: false, message: "Payment amount mismatch" }, { status: 400 });
    }
    if (!['captured', 'authorized'].includes(String(payment.status))) {
      return NextResponse.json({ success: false, message: "Payment is not completed" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 500 });
  }
}
