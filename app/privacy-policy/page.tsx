export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <p className="mb-6">
        We value your privacy and only collect the information necessary to
        process your order and deliver your purchased digital products.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Information We Collect
      </h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>Name</li>
        <li>Email Address</li>
        <li>Payment Details (processed securely by the payment provider)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        How We Use Your Information
      </h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>Process payments</li>
        <li>Deliver purchased products</li>
        <li>Provide customer support</li>
      </ul>

      <p className="mt-10 text-gray-500">
        Last Updated: July 2026
      </p>
    </main>
  );
}