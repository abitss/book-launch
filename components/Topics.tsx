import { BookOpen } from "lucide-react";
import book from "@/data/books";

export default function Topics() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
            📚 Complete Syllabus Coverage
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            What You'll Learn
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Covers every important topic required for UPSC Civil Services,
            State PCS and other competitive examinations.
          </p>

        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {book.topics.map((topic) => (

            <div
              key={topic}
              className="
              group
              rounded-2xl
              border
              border-gray-200
              bg-slate-50
              p-6
              transition
              duration-300
              hover:-translate-y-2
              hover:border-green-500
              hover:bg-green-50
              hover:shadow-xl
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                  rounded-xl
                  bg-green-100
                  p-3
                  transition
                  group-hover:bg-green-600
                  "
                >
                  <BookOpen className="h-6 w-6 text-green-700 group-hover:text-white" />
                </div>

                <h3 className="font-semibold text-gray-800">
                  {topic}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}