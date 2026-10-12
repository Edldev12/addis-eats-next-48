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
      const update = JSON.parse(event.data);

      setData((current) => ({
        ...current,
        ...update,
      }));

      if (update.status === "delivered") {
        source.close();
        setConnected(false);
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

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Order #{data.id}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${connected
            ? "bg-green-100 text-green-700"
            : "bg-slate-100 text-slate-600"
            }`}
        >
          {connected ? "Live" : "Disconnected"}
        </span>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          Live updates are unavailable.
        </p>
      )}

      <p className="text-slate-600">
        Status:
        <span className="ml-2 font-semibold capitalize text-slate-900">
          {data.status}
        </span>
      </p>
    </div>
  );
}