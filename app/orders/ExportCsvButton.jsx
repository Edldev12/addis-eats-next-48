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
      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
    >
      Export CSV
    </button>
  );
}