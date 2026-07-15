"use client";

import Image from "next/image";
import { Star, Download, ShieldCheck, Smartphone } from "lucide-react";
import { books } from "@/data/books";

const book = books[0];

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 lg:flex-row">

        {/* Left */}

        <div className="flex-1">

          <div className="inline-block rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-700">
            {book.badge}
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900">
            {book.title}
          </h1>

          <h2 className="mt-3 text-3xl font-bold text-green-600">
            {book.subtitle}
          </h2>

          <p className="mt-4 text-xl text-gray-700">
            by {book.author}
          </p>

          <div className="mt-8 flex items-center gap-2">

            {[1,2,3,4,5].map((i)=>(
              <Star
                key={i}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}

            <span className="font-bold">
              {book.rating}
            </span>

            <span className="text-gray-500">
              ({book.reviews.toLocaleString()} Reviews)
            </span>

          </div>

          <div className="mt-4 text-lg">
            👨‍🎓 {book.students.toLocaleString()} Students Purchased
          </div>

          <div className="mt-10 flex items-center gap-5">

            <span className="text-6xl font-black text-green-600">
              ₹{book.price}
            </span>

            <span className="text-4xl text-gray-400 line-through">
              ₹{book.originalPrice}
            </span>

          </div>

          <div className="mt-10 space-y-4">

            {book.features.map((feature)=>(
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
            "
          >
            🛒 Buy Now • ₹{book.price}
          </button>

        </div>

        {/* Right */}

        <div className="flex flex-1 justify-center">

          <div className="overflow-hidden rounded-3xl border-8 border-white shadow-2xl">

            <Image
              src={book.image}
              alt={book.title}
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