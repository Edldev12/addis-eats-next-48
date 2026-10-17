"use client";
import LocationPicker from "@/app/checkout/LocationPicker";
import { useCart } from "@/app/providers";
import { placeOrder } from "@/app/actions";
import { useCallback, useRef, useState } from "react";

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const submittingRef = useRef(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleLocationChange = useCallback(({ latitude, longitude }) => {
    setLatitude(latitude);
    setLongitude(longitude);
  }, []);
  const isError =
    /unable|failed|please|error|invalid|not found/i.test(message);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("1. Submit handler started");

    console.log("2. Coordinates:", { latitude, longitude });

    if (latitude === null || longitude === null) {
      setMessage("Please search your address or select a point on the map.");
      console.error("STOPPED: Delivery coordinates are missing");
      return;
    }

    if (submittingRef.current) {
      console.log("STOPPED: Already submitting");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setMessage("");
    setFieldErrors({});

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("latitude", String(latitude));
      formData.append("longitude", String(longitude));
      formData.append("items", JSON.stringify(cart));

      console.log("3. Calling placeOrder");

      const result = await placeOrder(formData);

      console.log("4. placeOrder result:", result);

      if (!result.success) {
        console.error("Order validation failed:", result);
        setFieldErrors(result.fieldErrors || {});
        setMessage(
          result.message ||
          Object.values(result.fieldErrors || {}).flat().join(" ") ||
          "Order could not be placed."
        );
        return;
      }

      setMessage(result.message || "Order placed successfully!");
      clearCart();
      setName("");
      setPhone("");
      setAddress("");
      setLatitude(null);
      setLongitude(null);
    } catch (error) {
      console.error("5. Order submission failed:", error);
      setMessage("Unable to place your order. Please try again.");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }


  if (cart.length === 0 && !message) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl dark:bg-amber-400/10">
          🛒
        </div>

        <h2 className="mt-5 text-2xl font-extrabold text-slate-900 dark:text-white">
          Your cart is empty
        </h2>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Add some delicious dishes before checking out.
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
          className={`mb - 6 rounded - 2xl border p - 4 text - sm font - medium ${isError
            ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
            : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
            } `}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg" aria-hidden="true">
              {isError ? "!" : "✓"}
            </span>
            <p>{message}</p>
          </div>
        </div>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-5">
        <form
          onSubmit={handleSubmit}
          aria-busy={submitting}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7 lg:col-span-3"
        >
          <div className="mb-7">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              Almost there
            </span>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Order Information
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Enter your details so we can prepare your order.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
              >
                Full name
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
                className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 aria-[invalid=true]:border-red-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
              />

              {fieldErrors.name && (
                <p
                  id="name-error"
                  className="mt-2 text-sm font-medium text-red-600 dark:text-red-400"
                >
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
              >
                Phone number
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
                className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 aria-[invalid=true]:border-red-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
              />

              {fieldErrors.phone && (
                <p
                  id="phone-error"
                  className="mt-2 text-sm font-medium text-red-600 dark:text-red-400"
                >
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            {fieldErrors.items && (
              <p
                className="rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
                role="alert"
              >
                {fieldErrors.items}
              </p>
            )}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
              >
                Delivery address
              </label>
              {Object.entries(fieldErrors).map(([field, error]) => (
                <p
                  key={field}
                  className="mt-2 text-sm text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {String(error)}
                </p>
              ))}
              <textarea
                id="address"
                name="address"
                autoComplete="street-address"
                required
                rows={3}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Enter your area, street, building, or nearby landmark"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
              />
              <LocationPicker
                latitude={latitude}
                longitude={longitude}
                onLocationChange={handleLocationChange}
                address={address}
              />
            </div>


            <button
              type="submit"
              disabled={submitting}
              className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-amber-500 px-6 py-4 text-base font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {submitting ? (
                <>
                  <span
                    className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
                    aria-hidden="true"
                  />
                  Placing Order...
                </>
              ) : (
                <>
                  Place Order
                  <span aria-hidden="true" className="text-xl">
                    →
                  </span>
                </>
              )}
            </button>
            <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
              Please check your details before placing your order.
            </p>
          </div>
        </form>

        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7 lg:sticky lg:top-6 lg:col-span-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
            Your selection
          </span>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Order Summary
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} item(s) in your order
          </p>

          <div className="mt-6 space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="break-words font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.quantity} × ETB {item.price}
                  </p>
                </div>

                <p className="shrink-0 font-extrabold text-slate-900 dark:text-white">
                  ETB {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-dashed border-slate-200 pt-5 dark:border-slate-700">
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                Total
              </span>

              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                ETB {total}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Your total is calculated from the dishes and quantities in your cart.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
