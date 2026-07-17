"use client";

import { ShoppingCart } from "lucide-react";
import { startPayment } from "@/lib/payment";

export default function StickyBuyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-lg shadow-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        <div>
          <p className="text-sm text-gray-500">
            Limited Time Offer
          </p>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-green-600">
              ₹49
            </span>

            <span className="text-lg text-gray-400 line-through">
              ₹299
            </span>
          </div>
        </div>

        <button
          onClick={startPayment}
          className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-green-600
          px-8
          py-4
          font-bold
          text-white
          transition
          hover:scale-105
          hover:bg-green-700
          "
        >
          <ShoppingCart className="h-5 w-5" />
          Buy Now
        </button>

      </div>
    </div>
  );
}