import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getOrders } from "@/lib/orders";

export default async function AdminOrdersPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/admin/orders");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  const orders = await getOrders();

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-3xl bg-slate-950 p-8 text-white shadow-lg">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
            Addis Eats · Administration
          </p>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Order Management
          </h1>

          <p className="mt-3 text-slate-300">
            Welcome, {String(user.name ?? "Admin")}. Monitor customer orders and revenue.
          </p>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Orders
            </p>
            <p className="mt-2 text-3xl font-extrabold">{orders.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Pending Orders
            </p>
            <p className="mt-2 text-3xl font-extrabold text-amber-600">
              {pendingOrders}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Revenue
            </p>
            <p className="mt-2 text-3xl font-extrabold text-emerald-600">
              {totalRevenue.toLocaleString("en-ET")} ETB
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 p-6 dark:border-slate-800">
            <h2 className="text-xl font-extrabold">All Orders</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Review customer information, items, and order status.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-lg font-bold">No orders yet</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Customer orders will appear here after they are placed.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {orders.map((order) => (
                <article key={order.id} className="p-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Order ID
                      </p>
                      <p className="mt-1 break-all font-mono text-sm font-semibold">
                        {order.id}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-sm font-bold capitalize text-amber-900 dark:bg-amber-400/10 dark:text-amber-300">
                      {order.status || "pending"}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Customer
                      </p>
                      <p className="mt-1 font-semibold">{order.name}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Phone
                      </p>
                      <p className="mt-1 font-semibold">{order.phone}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="mb-3 text-sm font-bold">Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={`${order.id}-${item.dishId}-${index}`}
                          className="flex justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800"
                        >
                          <span>{item.dishId}</span>
                          <span className="font-semibold">
                            × {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
                    <span className="font-bold">Order Total</span>
                    <span className="text-lg font-extrabold text-emerald-600">
                      {Number(order.total || 0).toLocaleString("en-ET")} ETB
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}