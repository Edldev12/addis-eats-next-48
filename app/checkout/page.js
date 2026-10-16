import CheckoutForm from "@/components/CheckoutForm";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-5 py-10 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <header className="relative mb-8 overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-700/30 via-slate-950 to-slate-950"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
              <span aria-hidden="true">🛒</span>
              Addis Eats
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Checkout
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              You’re almost there! Complete your order details to get your
              favorite meal on its way.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-200">
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                ✓ Review your details
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                ✓ Place your order
              </span>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="mb-6 border-b border-slate-100 pb-5 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Delivery details
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Enter your information below to complete your order.
            </p>
          </div>

          <CheckoutForm />
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
          Thank you for choosing Addis Eats.
        </p>
      </div>
    </main>
  );
}