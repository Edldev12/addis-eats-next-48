
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getOrders } from "@/lib/orders";

const sampleOrders = [
  {
    id: "ORD-DEMO-1001",
    name: "Abebe Kebede",
    phone: "0912345678",
    items: [
      { dishId: "kitfo", quantity: 2 },
      { dishId: "shiro", quantity: 1 },
    ],
    total: 1150,
    status: "pending",
  },
  {
    id: "ORD-DEMO-1002",
    name: "Hana Tesfaye",
    phone: "0923456789",
    items: [
      { dishId: "doro-wot", quantity: 1 },
      { dishId: "injera", quantity: 2 },
    ],
    total: 650,
    status: "preparing",
  },
  {
    id: "ORD-DEMO-1003",
    name: "Dawit Bekele",
    phone: "0934567890",
    items: [{ dishId: "pizza", quantity: 1 }],
    total: 500,
    status: "ready",
  },
];

export default async function AdminOrdersPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/admin/orders");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  const storedOrders = await getOrders();
  const orders = storedOrders.length > 0 ? storedOrders : sampleOrders;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const statusStyles = {
    pending:
      "bg-amber-100 text-amber-900 dark:bg-amber-400/10 dark:text-amber-300",
    preparing:
      "bg-blue-100 text-blue-900 dark:bg-blue-400/10 dark:text-blue-300",
    ready:
      "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/10 dark:text-emerald-300",
    completed:
      "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
  };

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

        {storedOrders.length === 0 && (
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200">
            Demo mode: these are sample orders, not real customer orders.
          </div>
        )}

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

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {orders.map((order) => {
              const status = String(order.status || "pending").toLowerCase();

              return (
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

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-sm font-bold capitalize ${statusStyles[status] || statusStyles.pending
                        }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Customer
                      </p>
                      <p className="mt-1 font-semibold">
                        {order.name || "Customer"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Phone
                      </p>
                      <p className="mt-1 font-semibold">
                        {order.phone || "Not provided"}
                      </p>
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
                          <span className="capitalize">
                            {String(item.dishId).replaceAll("-", " ")}
                          </span>
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
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
