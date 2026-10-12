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
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Addis Eats
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Your Cart
          </h1>

          <p className="mt-3 text-slate-600">
            Review your selected dishes before checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">
              Your cart is empty
            </h2>

            <p className="mt-3 text-slate-600">
              Add some delicious dishes from our menu.
            </p>

            <Link
              href="/menu"
              className={`mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 ${focusStyles}`}
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      ETB {item.price} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="font-semibold text-slate-900">
                      ETB {item.price * item.quantity}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className={`inline-flex min-h-11 items-center justify-center rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 ${focusStyles}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-700">
                  Total
                </span>

                <span className="text-2xl font-bold text-slate-900">
                  ETB {total}
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/checkout"
                  className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-center font-semibold text-white hover:bg-slate-800 ${focusStyles}`}
                >
                  Proceed to Checkout
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className={`inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 ${focusStyles}`}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}