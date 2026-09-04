import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createOrderRecord, getBookById } from "@/lib/catalog";

export async function POST(request: Request) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return NextResponse.json({ error: "Razorpay is not configured" }, { status: 503 });
    const { bookId } = await request.json();
    if (typeof bookId !== "string") return NextResponse.json({ error: "Book is required" }, { status: 400 });
    const book = await getBookById(bookId);
    if (!book || book.active === false) return NextResponse.json({ error: "Book not found" }, { status: 404 });
    if (!Number.isFinite(book.price) || book.price <= 0) return NextResponse.json({ error: "Invalid book price" }, { status: 400 });

    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    const order = await razorpay.orders.create({ amount: Math.round(book.price * 100), currency: "INR", receipt: `ebookies_${Date.now()}`, notes: { book_id: book.id, book_title: book.title } });
    await createOrderRecord({ book_id: book.id, amount: book.price, currency: "INR", status: "created", razorpay_order_id: order.id });
    return NextResponse.json({ id: order.id, amount: order.amount, currency: order.currency, book: { id: book.id, title: book.title } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create payment order" }, { status: 500 });
  }
}
