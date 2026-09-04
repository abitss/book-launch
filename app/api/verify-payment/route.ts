import crypto from "crypto";
import { NextResponse } from "next/server";
import { createSignedBookUrl, getBookById, markOrderPaid } from "@/lib/catalog";

export async function POST(request: Request) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return NextResponse.json({ success: false, message: "Razorpay is not configured" }, { status: 503 });
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookId } = body;
    if (![razorpay_order_id, razorpay_payment_id, razorpay_signature, bookId].every((v) => typeof v === "string" && v.length)) return NextResponse.json({ success: false, message: "Missing payment fields" }, { status: 400 });

    const expected = crypto.createHmac("sha256", secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
    const a = Buffer.from(expected, "utf8"); const b = Buffer.from(razorpay_signature, "utf8");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return NextResponse.json({ success: false, message: "Invalid payment signature" }, { status: 400 });

    const book = await getBookById(bookId);
    if (!book) return NextResponse.json({ success: false, message: "Book not found after payment" }, { status: 404 });
    await markOrderPaid(razorpay_order_id, razorpay_payment_id);
    const downloadUrl = book.file_path ? await createSignedBookUrl(book.file_path) : null;
    return NextResponse.json({ success: true, message: "Payment verified successfully", downloadUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Verification failed" }, { status: 500 });
  }
}
