"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul S.",
    role: "UPSC Aspirant",
    review:
      "Sample testimonial: The PDF quality is excellent and the download process was smooth.",
  },
  {
    name: "Priya K.",
    role: "State PCS Aspirant",
    review:
      "Sample testimonial: Clean formatting and easy to read on my phone.",
  },
  {
    name: "Amit R.",
    role: "SSC Aspirant",
    review:
      "Sample testimonial: The payment and download were quick and simple.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">
            ⭐ Customer Feedback
          </span>

          <h2 className="mt-6 text-4xl font-extrabold">
            What Readers Say
          </h2>

          <p className="mt-4 text-gray-500">
            Replace these sample testimonials with real customer reviews.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {reviews.map((review) => (

            <div
              key={review.name}
              className="
                rounded-3xl
                border
                border-gray-200
                bg-slate-50
                p-8
                shadow-sm
                transition
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              <div className="mb-5 flex">

                {[1,2,3,4,5].map((i)=>(
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <p className="leading-8 text-gray-600">
                "{review.review}"
              </p>

              <div className="mt-8">

                <h3 className="font-bold">
                  {review.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {review.role}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}