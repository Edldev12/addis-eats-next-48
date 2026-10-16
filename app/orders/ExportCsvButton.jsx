"use client";

import { toCsv } from "@/lib/csv";

export default function ExportCsvButton({ orders }) {
  function handleExport() {
    const rows = orders.map((order) => ({
      orderId: order.id,
      customer: order.name,
      phone: order.phone,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items
        ?.map((item) => `${item.name} x${item.quantity}`)
        .join("; "),
    }));

    const csv = toCsv(rows);
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "addis-eats-order-history.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-sm font-extrabold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:translate-y-0"
    >
      <span aria-hidden="true">↓</span>
      Export CSV
    </button>

  );
}