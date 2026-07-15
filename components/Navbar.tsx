"use client";

import { BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-green-600 p-2">
            <BookOpen className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              UPSC Library
            </h1>

            <p className="text-xs text-gray-500">
              Premium Digital Notes
            </p>
          </div>

        </div>

        <button
          className="
          rounded-xl
          bg-green-600
          px-5
          py-2
          font-semibold
          text-white
          hover:bg-green-700
          "
        >
          Buy ₹49
        </button>

      </div>
    </header>
  );
}