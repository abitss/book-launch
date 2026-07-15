"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How will I receive the PDF?",
    answer:
      "Immediately after successful payment, you'll be redirected to a download page and also receive the download link.",
  },
  {
    question: "Can I read it on my phone?",
    answer:
      "Yes. The PDF works perfectly on Android, iPhone, tablets, laptops, and desktops.",
  },
  {
    question: "Is this a one-time payment?",
    answer:
      "Yes. Pay once and get lifetime access to your purchased PDF.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "UPI, Credit Card, Debit Card, Net Banking, Wallets, and other methods supported by Razorpay.",
  },
  {
    question: "Can I download it again later?",
    answer:
      "Yes. You'll be able to download it again from the link provided after purchase, according to your delivery setup.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-4xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
            ❓ Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-extrabold">
            Have Questions?
          </h2>

          <p className="mt-4 text-gray-500">
            Everything you need to know before purchasing.
          </p>

        </div>

        <div className="mt-14 space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="border-t border-gray-100 px-6 py-5 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}