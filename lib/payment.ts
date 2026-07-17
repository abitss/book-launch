export async function startPayment() {
  const res = await fetch("/api/create-order", {
    method: "POST",
  });

  const order = await res.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "ReadRight",
    description: "Indian Polity",
    order_id: order.id,

    handler: async function (response: any) {
      const verify = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });

      const result = await verify.json();

      if (result.success) {
        alert("✅ Payment Successful!");

        const link = document.createElement("a");
        link.href = "/llp.pdf";
        link.download = "Laxmikanth.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("❌ Payment Verification Failed");
      }
    },
  };

  const razorpay = new (window as any).Razorpay(options);

  razorpay.open();
}