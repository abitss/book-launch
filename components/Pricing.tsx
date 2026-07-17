"use client";

import { CheckCircle, ShieldCheck, Clock3 } from "lucide-react";
import { startPayment } from "@/lib/payment";

export default function Pricing() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="overflow-hidden rounded-3xl border border-green-200 bg-white shadow-2xl">

          {/* Header */}
          <div className="bg-green-600 px-8 py-8 text-center text-white">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              🔥 Limited Time Offer
            </span>

            <h2 className="mt-6 text-4xl font-black">
              Get Instant Access
            </h2>

            <p className="mt-3 text-lg text-green-100">
              Download immediately after successful payment.
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-10">

            <div className="flex items-center justify-center gap-5">
              <span className="text-6xl font-black text-green-600">
                ₹49
              </span>

              <span className="text-3xl text-gray-400 line-through">
                ₹299
              </span>

              <span className="rounded-full bg-red-100 px-4 py-2 font-bold text-red-600">
                84% OFF
              </span>
            </div>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Latest 8th Edition (2025)
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                High Quality Searchable PDF
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Instant Digital Delivery
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Lifetime Access
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" />
                100% Secure Payment
              </div>

            </div>

            <button
              onClick={startPayment}
              className="
                mt-10
                w-full
                rounded-2xl
                bg-green-600
                py-5
                text-xl
                font-bold
                text-white
                shadow-xl
                transition
                duration-300
                hover:scale-[1.02]
                hover:bg-green-700
              "
            >
              🛒 Buy Now • ₹49
            </button>

            <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
              <Clock3 className="h-5 w-5" />
              Offer may change without notice.
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <div className="rounded-xl border px-5 py-3 font-semibold">
                UPI
              </div>

              <div className="rounded-xl border px-5 py-3 font-semibold">
                Visa
              </div>

              <div className="rounded-xl border px-5 py-3 font-semibold">
                Mastercard
              </div>

              <div className="rounded-xl border px-5 py-3 font-semibold">
                Razorpay
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}