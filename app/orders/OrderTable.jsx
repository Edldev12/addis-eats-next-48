
import Link from "next/link";

export default function OrderTable({ orders }) {
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

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-stone-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/50 sm:px-6">
        <div>
          <h2 className="font-extrabold text-slate-900 dark:text-white">
            Order History
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {orders.length} {orders.length === 1 ? "order" : "orders"} found
          </p>
        </div>

        <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900 dark:bg-amber-400/10 dark:text-amber-300">
          Addis Eats
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl dark:bg-amber-400/10">
            📦
          </div>
          <h3 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">
            No orders yet
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Your orders will appear here when they become available.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full text-left text-sm">
            <caption className="sr-only">Order history</caption>

            <thead className="bg-slate-50 dark:bg-slate-950/40">
              <tr>
                {["Order", "Customer", "Items", "Status", "Date"].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="whitespace-nowrap px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:px-6"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.map((order) => {
                const status = (order.status || "pending").toLowerCase();
                const statusStyle =
                  statusStyles[status] ||
                  "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

                return (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-amber-50/50 dark:hover:bg-slate-800/50"
                  >
                    <td className="whitespace-nowrap px-5 py-5 sm:px-6">
                      <Link
                        href={`/track/${order.id}`}
                        className="inline-flex items-center gap-2 font-extrabold text-amber-700 transition hover:text-amber-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
                      >
                        #{order.id.slice(0, 8)}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </td>

                    <td className="px-5 py-5 sm:px-6">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {order.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {order.phone}
                      </div>
                    </td>

                    <td className="px-5 py-5 text-slate-600 dark:text-slate-300 sm:px-6">
                      <div className="space-y-1">
                        {order.items?.map((item) => (
                          <div key={item.id}>
                            {item.name}{" "}
                            <span className="font-semibold text-slate-900 dark:text-white">
                              × {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 sm:px-6">
                      <span
                        className={`inline - flex rounded - full px - 3 py - 1.5 text - xs font - extrabold capitalize ${statusStyle} `}
                      >
                        {status.replaceAll("_", " ")}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 text-slate-600 dark:text-slate-300 sm:px-6">
                      {new Date(order.createdAt).toLocaleDateString("en-ET")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
