"use client";

import Link from "next/link";
import { useCart } from "@/app/providers";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const focusStyles =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500";

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-10 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <header className="relative mb-8 overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-700/30 via-slate-950 to-slate-950"
          />

          <div className="relative">
            <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
              Addis Eats
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your Cart
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Review your selected dishes before checkout.
            </p>

            <p className="mt-5 text-sm font-semibold text-amber-300">
              {cart.length} {cart.length === 1 ? "dish" : "different dishes"} in your cart
            </p>
          </div>
        </header>

        {cart.length === 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl dark:bg-amber-400/10">
              🛒
            </span>

            <h2 className="mt-5 text-2xl font-extrabold text-slate-900 dark:text-white">
              Your cart is empty
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Your next favorite meal is waiting. Explore our menu and add
              something delicious.
            </p>

            <Link
              href="/menu"
              className={`mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-400 px-6 py-3 font-extrabold text-slate-950 transition hover:bg-amber-300 ${focusStyles}`}
            >
              Browse Menu →
            </Link>
          </section>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
            <section className="min-w-0 space-y-4">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <h2 className="break-words text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl">
                        {item.name}
                      </h2>

                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        ETB {item.price} × {item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <p className="whitespace-nowrap font-extrabold text-amber-700 dark:text-amber-400">
                        ETB {item.price * item.quantity}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className={`inline-flex min-h-10 items-center justify-center rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40 ${focusStyles}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className={`inline-flex min-h-10 items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-400 ${focusStyles}`}
              >
                Clear entire cart
              </button>
            </section>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-6">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Order summary
              </h2>

              <div className="mt-5 flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span>Items</span>
                <span>
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-5 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
                <span>Subtotal</span>
                <span>ETB {total}</span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Total
                </span>

                <span className="text-xl font-extrabold text-amber-700 dark:text-amber-400">
                  ETB {total}
                </span>
              </div>

              <Link
                href="/checkout"
                className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-center font-extrabold text-slate-950 transition hover:bg-amber-300 ${focusStyles}`}
              >
                Proceed to Checkout →
              </Link>

              <Link
                href="/menu"
                className={`mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-amber-400 hover:bg-amber-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 ${focusStyles}`}
              >
                Continue Shopping
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                Your delicious meal is just a few steps away.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}