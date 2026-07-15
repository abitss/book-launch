// components/TrustBar.tsx

import {
  ShieldCheck,
  Smartphone,
  Download,
  Clock,
} from "lucide-react";

const items = [
  {
    icon: Download,
    title: "Instant Download",
    desc: "Get access immediately after payment",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Payment",
    desc: "Protected by Razorpay",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    desc: "Mobile, Tablet & Laptop",
  },
  {
    icon: Clock,
    title: "Lifetime Access",
    desc: "Download anytime",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            Why Thousands Choose This PDF
          </h2>

          <p className="mt-3 text-gray-500">
            Premium quality. Instant delivery. Secure checkout.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  p-8
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >
                <div className="mb-5 inline-flex rounded-2xl bg-green-100 p-4">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>

                <h3 className="text-lg font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 text-gray-500">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}