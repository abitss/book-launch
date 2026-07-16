import { CheckCircle } from "lucide-react";
import book from "@/data/books";

const bookData = book[0];

export default function About() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-green-700 font-semibold">
            📖 About This Book
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            One of India's Most Trusted UPSC Books
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            {bookData.description}
          </p>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {bookData.features.map((feature) => (
            <div
              key={feature}
              className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              shadow-sm
              transition
              hover:-translate-y-1
              hover:shadow-lg
              "
            >
              <CheckCircle className="h-7 w-7 text-green-600" />

              <span className="font-medium text-gray-700">
                {feature}
              </span>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}