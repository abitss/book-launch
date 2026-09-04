import crypto from "crypto";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createSignedBookUrl, getBookById, markOrderPaid } from "@/lib/catalog";

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !secret) return NextResponse.json({ success: false, message: "Razorpay is not configured" }, { status: 503 });

    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookId } = body;
    if (![razorpay_order_id, razorpay_payment_id, razorpay_signature, bookId].every((v) => typeof v === "string" && v.length)) {
      return NextResponse.json({ success: false, message: "Missing payment fields" }, { status: 400 });
    }

    const expected = crypto.createHmac("sha256", secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(razorpay_signature, "utf8");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return NextResponse.json({ success: false, message: "Invalid payment signature" }, { status: 400 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: secret });
    const paidOrder = await razorpay.orders.fetch(razorpay_order_id);
    const orderBookId = String(paidOrder.notes?.book_id || "");
    if (!orderBookId || orderBookId !== bookId) {
      return NextResponse.json({ success: false, message: "Payment does not match this book" }, { status: 400 });
    }

    const book = await getBookById(orderBookId);
    if (!book) return NextResponse.json({ success: false, message: "Book not found after payment" }, { status: 404 });
    if (Number(paidOrder.amount) !== Math.round(book.price * 100)) {
      return NextResponse.json({ success: false, message: "Payment amount mismatch" }, { status: 400 });
    }

    await markOrderPaid(razorpay_order_id, razorpay_payment_id);
    const downloadUrl = book.file_path ? await createSignedBookUrl(book.file_path) : null;
    return NextResponse.json({ success: true, message: "Payment verified successfully", downloadUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Verification failed" }, { status: 500 });
  }
}
