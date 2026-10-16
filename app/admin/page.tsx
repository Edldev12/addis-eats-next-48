import Link from "next/link";
import { getOrders } from "../../lib/orders.js";
import { getSession } from "../../lib/session.js";
import { redirect } from "next/navigation";

const currency = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 2,
});

export default async function AdminDashboard() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  const orders = await getOrders();
  const today = new Date().toDateString();

  const todayOrders = orders.filter(
    (order) => new Date(order.createdAt).toDateString() === today
  );

  const revenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce(
      (sum, order) =>
        sum +
        (Number(order.total) ||
          (order.items || []).reduce(
            (itemSum, item) =>
              itemSum + Number(item.price || 0) * Number(item.quantity || 0),
            0
          )),
      0
    );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: "📦",
      description: "All customer orders",
    },
    {
      label: "Today's Orders",
      value: todayOrders.length,
      icon: "🗓️",
      description: "Orders received today",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: "⏳",
      description: "Waiting for processing",
    },
    {
      label: "Revenue",
      value: currency.format(revenue),
      icon: "💰",
      description: "Non-cancelled orders",
    },
  ];

  return (
    <main className="min-h-screen bg-stone-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:block">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-2xl dark:bg-amber-400/10">
              🍽️
            </span>
            <span>
              <span className="block text-lg font-black">Addis Eats</span>
              <span className="text-xs text-slate-500">Admin Console</span>
            </span>
          </Link>

          <p className="mb-3 mt-10 text-xs font-bold uppercase tracking-widest text-slate-400">
            Management
          </p>

          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-xl bg-amber-400 px-4 py-3 font-bold text-slate-950"
            >
              <span>▦</span> Dashboard
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-600 hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <span>📦</span> Orders
            </Link>
            <Link
              href="/admin/menu"
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-600 hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <span>🍲</span> Menu
            </Link>
          </nav>

          <div className="mt-10 rounded-2xl bg-stone-100 p-4 dark:bg-slate-800">
            <p className="font-bold">Restaurant Admin</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Manage your restaurant from one place.
            </p>
          </div>

          <Link
            href="/"
            className="mt-6 block rounded-xl px-4 py-3 font-semibold text-slate-600 hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            ← Back to Store
          </Link>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-5 dark:border-slate-800 dark:bg-slate-900 sm:px-8">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Addis Eats / Admin
              </p>
              <h1 className="mt-1 text-2xl font-black sm:text-3xl">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 font-black text-amber-900 dark:bg-amber-400/10 dark:text-amber-300">
                A
              </div>
              <div>
                <p className="text-sm font-bold">
                  {typeof user.name === "string" ? user.name : "Admin"}
                </p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
            </div>
          </header>

          <div className="p-5 sm:p-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">Restaurant overview</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Here&apos;s what&apos;s happening with your restaurant.
                </p>
              </div>

              <Link
                href="/admin/orders"
                className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                View all orders →
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-xl dark:bg-amber-400/10">
                      {stat.icon}
                    </span>
                  </div>
                  <p className="mt-5 break-words text-2xl font-black">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {stat.description}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-black">Recent orders</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    The latest orders from your customers.
                  </p>
                </div>
                <Link
                  href="/admin/orders"
                  className="text-sm font-bold text-amber-700 hover:text-amber-600 dark:text-amber-400"
                >
                  View all →
                </Link>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center">
                  <span className="text-4xl">📦</span>
                  <h3 className="mt-4 font-bold">No orders yet</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Customer orders will appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left text-sm">
                    <thead className="bg-stone-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950">
                      <tr>
                        <th className="px-5 py-4">Order ID</th>
                        <th className="px-5 py-4">Customer</th>
                        <th className="px-5 py-4">Date</th>
                        <th className="px-5 py-4">Amount</th>
                        <th className="px-5 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {[...orders]
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )
                        .slice(0, 8)
                        .map((order) => {
                          const total =
                            Number(order.total) ||
                            (order.items || []).reduce(
                              (sum, item) =>
                                sum +
                                Number(item.price || 0) *
                                Number(item.quantity || 0),
                              0
                            );

                          return (
                            <tr
                              key={order.id}
                              className="transition hover:bg-stone-50 dark:hover:bg-slate-800/50"
                            >
                              <td className="px-5 py-4 font-bold">
                                #{String(order.id).slice(0, 8)}
                              </td>
                              <td className="px-5 py-4">
                                <p className="font-semibold">
                                  {order.name || "Customer"}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                  {order.phone || "—"}
                                </p>
                              </td>
                              <td className="px-5 py-4 text-slate-500">
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-ET"
                                )}
                              </td>
                              <td className="px-5 py-4 font-bold">
                                {currency.format(total)}
                              </td>
                              <td className="px-5 py-4">
                                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold capitalize text-amber-900 dark:bg-amber-400/10 dark:text-amber-300">
                                  {order.status || "pending"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}