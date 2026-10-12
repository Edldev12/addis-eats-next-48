"use client";

import { useRef, useState } from "react";
import { useCart } from "@/app/providers";
import { placeOrder } from "@/app/actions";

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Prevent repeated submissions before React re-renders.
  const submittingRef = useRef(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function handleSubmit(event) {
    event.preventDefault();

    if (submittingRef.current) return;
    submittingRef.current = true;

    setSubmitting(true);
    setMessage("");
    setFieldErrors({});

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("items", JSON.stringify(cart));

      const result = await placeOrder(formData);

      if (!result.success) {
        setFieldErrors(result.fieldErrors || {});
        setMessage(result.message || "");
        return;
      }

      setMessage(result.message);
      clearCart();
      setName("");
      setPhone("");
    } catch (error) {
      console.error("Failed to place order:", error);
      setMessage("Unable to place your order. Please try again.");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  if (cart.length === 0 && !message) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-semibold text-slate-900">
          Your cart is empty
        </h2>

        <p className="mt-3 text-slate-600">
          Add some dishes before checking out.
        </p>
      </div>
    );
  }

  return (
    <>
      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`mb-6 rounded-xl p-4 ${message.toLowerCase().includes("unable") ||
            message.toLowerCase().includes("failed")
            ? "bg-red-50 text-red-700"
            : "bg-green-50 text-green-700"
            }`}
        >
          {message}
        </div>
      )}


      <div className="grid gap-6 md:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          aria-busy={submitting}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          <h2 className="text-2xl font-semibold text-slate-900">
            Order Information
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={
                  fieldErrors.name ? "name-error" : undefined
                }
                className="min-h-11 w-full rounded-lg border border-slate-300 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />

              {fieldErrors.name && (
                <p id="name-error" className="mt-2 text-sm text-red-600">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="0912345678"
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={
                  fieldErrors.phone ? "phone-error" : undefined
                }
                className="min-h-11 w-full rounded-lg border border-slate-300 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />

              {fieldErrors.phone && (
                <p id="phone-error" className="mt-2 text-sm text-red-600">
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            {fieldErrors.items && (
              <p className="text-sm text-red-600" role="alert">
                {fieldErrors.items}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || cart.length === 0}
              className="min-h-11 w-full rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <div>
                  <p className="font-medium text-slate-900">
                    {item.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.quantity} × ETB {item.price}
                  </p>
                </div>

                <p className="font-semibold text-slate-900">
                  ETB {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-700">
                Total
              </span>

              <span className="text-xl font-bold text-slate-900">
                ETB {total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
