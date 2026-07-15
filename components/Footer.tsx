import Link from "next/link";
import { BookOpen, ShieldCheck, Download, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-green-600 p-3">
                <BookOpen className="h-7 w-7" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  UPSC Library
                </h2>

                <p className="text-sm text-gray-400">
                  Premium Digital Study Material
                </p>
              </div>

            </div>

            <p className="mt-6 leading-7 text-gray-400">
              High-quality digital study resources with secure payment,
              instant delivery, and lifetime access.
            </p>

          </div>

          {/* Features */}

          <div>

            <h3 className="mb-5 text-lg font-bold">
              Features
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>📥 Instant Download</li>

              <li>🔒 Secure Payment</li>

              <li>📱 Mobile Friendly</li>

              <li>♾️ Lifetime Access</li>

            </ul>

          </div>

          {/* Support */}

          <div>

            <h3 className="mb-5 text-lg font-bold">
              Support
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="flex items-center gap-2">
                <ShieldCheck size={18} />
                Secure Checkout
              </li>

              <li className="flex items-center gap-2">
                <Download size={18} />
                Instant Delivery
              </li>

              <li className="flex items-center gap-2">
                <Mail size={18} />
                support@upsclibrary.in
              </li>

            </ul>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-lg font-bold">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/refund-policy"
                  className="text-gray-400 hover:text-white transition"
                >
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>

            </ul>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-gray-800 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            <p className="text-sm text-gray-500">
              © 2026 UPSC Library. All Rights Reserved.
            </p>

            <p className="text-sm text-gray-500">
              Made with ❤️ for UPSC Aspirants
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}