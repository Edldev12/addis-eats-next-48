"use client";

import { useEffect, useState } from "react";

export default function OrderStatus({ id, initial }) {
  const [data, setData] = useState(initial);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const source = new EventSource(`/api/orders/${id}/stream`);

    source.onopen = () => {
      setConnected(true);
      setError(false);
    };

    source.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);

        setData((current) => ({
          ...current,
          ...update,
        }));

        if (update.status === "delivered") {
          source.close();
          setConnected(false);
        }
      } catch (err) {
        console.error("Failed to read order update:", err);
      }
    };

    source.onerror = () => {
      setConnected(false);
      setError(true);
      source.close();
    };

    return () => {
      source.close();
    };
  }, [id]);

  const status = (data.status || "pending").toLowerCase();

  const statusStyles = {
    pending:
      "bg-amber-100 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300",
    confirmed:
      "bg-blue-100 text-blue-800 dark:bg-blue-400/10 dark:text-blue-300",
    preparing:
      "bg-orange-100 text-orange-800 dark:bg-orange-400/10 dark:text-orange-300",
    ready:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300",
    delivered:
      "bg-green-100 text-green-800 dark:bg-green-400/10 dark:text-green-300",
    cancelled:
      "bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-300",
  };

  const currentStatusStyle =
    statusStyles[status] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 bg-stone-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-950/50 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              Order tracking
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Order #{data.id}
            </h2>
          </div>

          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${connected
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300"
              : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${connected ? "animate-pulse bg-emerald-500" : "bg-slate-400"
                }`}
              aria-hidden="true"
            />
            {connected ? "Live updates" : "Not connected"}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {error && status !== "delivered" && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
          >
            Live updates are temporarily unavailable. The displayed status may
            not reflect the latest order progress. Refresh the page to check
            the current status.
          </div>
        )}

        <div className="rounded-2xl border border-slate-100 p-5 dark:border-slate-800 sm:p-6">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Current status
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-xl px-4 py-2 text-sm font-extrabold capitalize ${currentStatusStyle}`}
            >
              {status.replaceAll("_", " ")}
            </span>

            {status === "delivered" && (
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                ✓ Order completed
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {status === "pending" &&
              "Your order has been received and is waiting for confirmation."}
            {status === "confirmed" &&
              "Your order has been confirmed. We will prepare it soon."}
            {status === "preparing" &&
              "Our kitchen is preparing your delicious meal."}
            {status === "ready" &&
              "Your order is ready. It will be delivered soon."}
            {status === "delivered" &&
              "Your order has been delivered. Enjoy your meal!"}
            {status === "cancelled" &&
              "This order has been cancelled."}
            {![
              "pending",
              "confirmed",
              "preparing",
              "ready",
              "delivered",
              "cancelled",
            ].includes(status) &&
              "Your order status will be updated as progress is made."}
          </p>
        </div>

        <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
          <span aria-hidden="true">ℹ️</span>
          <span>
            {status === "delivered"
              ? "Live tracking has ended because this order is complete."
              : "This page receives order status updates automatically while the live connection is active."}
          </span>
        </p>
      </div>
    </section>
  );
}
