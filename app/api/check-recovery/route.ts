import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getBookById } from "@/lib/catalog";

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !secret) return NextResponse.json({ success: false, message: "Payment service is not configured" }, { status: 503 });

    const { paymentId, bookId } = await request.json();
    if (typeof paymentId !== "string" || !paymentId.startsWith("pay_") || typeof bookId !== "string" || !bookId) {
      return NextResponse.json({ success: false, message: "Payment ID and book are required" }, { status: 400 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: secret });
    const payment = await razorpay.payments.fetch(paymentId);
    const orderId = String(payment.order_id || "");
    if (!orderId) return NextResponse.json({ success: false, message: "This payment is not linked to an order" }, { status: 400 });

    const order = await razorpay.orders.fetch(orderId);
    const orderBookId = String(order.notes?.book_id || "");
    if (!orderBookId || orderBookId !== bookId) {
      return NextResponse.json({ success: false, message: "Payment does not match the selected book" }, { status: 400 });
    }

    const book = await getBookById(bookId);
    if (!book) return NextResponse.json({ success: false, message: "Book not found" }, { status: 404 });

    const expectedAmount = Math.round(book.price * 100);
    if (Number(payment.amount) !== expectedAmount || Number(order.amount) !== expectedAmount) {
      return NextResponse.json({ success: false, message: "Payment amount does not match this book" }, { status: 400 });
    }

    if (String(payment.currency || "INR") !== "INR" || !["captured", "authorized"].includes(String(payment.status))) {
      return NextResponse.json({ success: false, message: "Payment is not completed" }, { status: 400 });
    }

    return NextResponse.json({ success: true, orderId, paymentId, bookId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Could not verify this payment" }, { status: 500 });
  }
}
