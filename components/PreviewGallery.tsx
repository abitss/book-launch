"use client";

import Image from "next/image";

const previews = [
  "/preview1.jpg",
  "/preview2.jpg",
  "/preview3.jpg",
  "/preview4.jpg",
];

export default function PreviewGallery() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="rounded-full bg-purple-100 px-4 py-2 font-semibold text-purple-700">
            📖 Book Preview
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            Preview Before You Buy
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Explore a few sample pages from the book before purchasing.
          </p>

        </div>

        {/* Gallery */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {previews.map((image, index) => (

            <div
              key={index}
              className="
              group
              overflow-hidden
              rounded-3xl
              bg-white
              shadow-lg
              transition
              duration-500
              hover:-translate-y-3
              hover:shadow-2xl
              "
            >

              <Image
                src={image}
                alt={`Preview ${index + 1}`}
                width={300}
                height={420}
                className="
                h-auto
                w-full
                transition
                duration-700
                group-hover:scale-110
                "
              />

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}