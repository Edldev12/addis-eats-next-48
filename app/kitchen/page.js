import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getOrders } from "@/lib/orders";
export default async function KitchenPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/kitchen");
  }

  if (user.role !== "staff") {
    redirect("/");
  }

  const orders = await getOrders();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Addis Eats
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Kitchen
          </h1>

          <p className="mt-2 text-slate-600">
            Welcome, {user.name}. Manage incoming customer orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              No orders yet
            </h2>

            <p className="mt-2 text-slate-600">
              New customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <p className="text-sm text-slate-500">
                      Order ID
                    </p>

                    <p className="font-mono text-sm text-slate-900">
                      {order.id}
                    </p>
                  </div>

                  <span className="inline-flex h-fit rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">
                      Customer
                    </p>

                    <p className="font-medium text-slate-900">
                      {order.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Phone
                    </p>

                    <p className="font-medium text-slate-900">
                      {order.phone}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Items
                  </p>

                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={`${order.id}-${item.dishId}-${index}`}
                        className="flex justify-between rounded-lg bg-slate-50 px-4 py-3"
                      >
                        <span className="text-slate-700">
                          {item.dishId}
                        </span>

                        <span className="font-semibold text-slate-900">
                          × {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">
                      Total
                    </span>

                    <span className="font-bold text-slate-900">
                      {order.total} ETB
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}