import CheckoutForm from "@/components/CheckoutForm";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Addis Eats
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Checkout
          </h1>

          <p className="mt-3 text-slate-600">
            Complete your order details before placing your order.
          </p>
        </div>

        <CheckoutForm />
      </div>
    </main>
  );
}