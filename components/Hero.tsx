"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Download, ShieldCheck, Smartphone } from "lucide-react";
import book from "@/data/books";

export default function Hero() {
  const [loading, setLoading] = useState(false);

  const bookData = book[0];

  const handlePayment = async () => {
    setLoading(true);

    const res = await fetch("/api/create-order", {
      method: "POST",
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "ReadRight",
      description: bookData.title,
      order_id: order.id,

      handler: async function (response: any) {
        const verify = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });

        const result = await verify.json();

        if (result.success) {
          alert("✅ Payment Successful!");

          const link = document.createElement("a");
          link.href = "/llp.pdf";
          link.download = "Laxmikanth.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          alert("❌ Payment Verification Failed");
        }
      },
    };

    const razorpay = new (window as any).Razorpay(options);

    razorpay.open();

    setLoading(false);
  };

  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 lg:flex-row">

        <div className="flex-1">

          <div className="inline-block rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-700">
            {bookData.badge}
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900">
            {bookData.title}
          </h1>

          <h2 className="mt-3 text-3xl font-bold text-green-600">
            {bookData.subtitle}
          </h2>

          <p className="mt-4 text-xl text-gray-700">
            by {bookData.author}
          </p>


          <div className="mt-8 flex items-center gap-2">

            {[1,2,3,4,5].map((i)=>(
              <Star
                key={i}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}

            <span className="font-bold">
              {bookData.rating}
            </span>

            <span className="text-gray-500">
              ({bookData.reviews.toLocaleString()} Reviews)
            </span>

          </div>


          <div className="mt-4 text-lg">
            👨‍🎓 {bookData.students.toLocaleString()} Students Purchased
          </div>


          <div className="mt-10 flex items-center gap-5">

            <span className="text-6xl font-black text-green-600">
              ₹{bookData.price}
            </span>

            <span className="text-4xl text-gray-400 line-through">
              ₹{bookData.originalPrice}
            </span>

          </div>


          <div className="mt-10 space-y-4">

            {bookData.features.map((feature)=>(

              <div
                key={feature}
                className="flex items-center gap-3 text-lg"
              >

                {feature.includes("Download") && (
                  <Download className="text-green-600" />
                )}

                {feature.includes("Lifetime") && (
                  <ShieldCheck className="text-green-600" />
                )}

                {feature.includes("Mobile") && (
                  <Smartphone className="text-green-600" />
                )}

                {!feature.includes("Download") &&
                 !feature.includes("Lifetime") &&
                 !feature.includes("Mobile") && (
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                 )}

                {feature}

              </div>

            ))}

          </div>


          <button
            onClick={handlePayment}
            disabled={loading}
            className="
            mt-12
            w-full
            rounded-2xl
            bg-green-600
            py-5
            text-2xl
            font-bold
            text-white
            transition
            hover:scale-[1.02]
            hover:bg-green-700
            disabled:opacity-50
            "
          >
            {loading ? "Processing..." : `🛒 Buy Now • ₹${bookData.price}`}
          </button>

        </div>


        <div className="flex flex-1 justify-center">

          <div className="overflow-hidden rounded-3xl border-8 border-white shadow-2xl">

            <Image
              src={bookData.image}
              alt={bookData.title}
              width={450}
              height={650}
              priority
            />

          </div>

        </div>

      </div>
    </section>
  );
}