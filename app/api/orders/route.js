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
    <main className="min-h-screen bg-stone-50 px-5 py-10 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="relative mb-8 overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-700/30 via-slate-950 to-slate-950"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Addis Eats · Staff
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Kitchen dashboard
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Welcome, {user.name}. Manage incoming customer orders.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-sm text-slate-300">
                Total orders
              </span>
              <span className="text-xl font-extrabold text-amber-400">
                {orders.length}
              </span>
            </div>
          </div>
        </header>

        {orders.length === 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl dark:bg-amber-400/10">
              🍽️
            </span>

            <h2 className="mt-5 text-xl font-extrabold text-slate-900 dark:text-white">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              New customer orders will appear here when they are placed.
            </p>
          </section>
        ) : (
          <section className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Incoming orders
              </h2>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-900 dark:bg-amber-400/10 dark:text-amber-300">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </span>
            </div>

            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-7"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Order ID
                    </p>

                    <p className="mt-1 break-all font-mono text-sm font-semibold text-slate-900 dark:text-white">
                      {order.id}
                    </p>
                  </div>

                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-bold capitalize text-amber-900 dark:bg-amber-400/10 dark:text-amber-300">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Customer
                    </p>

                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                      {order.name}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Phone
                    </p>

                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                      {order.phone}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-extrabold text-slate-900 dark:text-white">
                    Order items
                  </h3>

                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={`${order.id}-${item.dishId}-${index}`}
                        className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                      >
                        <span className="break-words text-sm font-medium text-slate-700 dark:text-slate-200">
                          {item.dishId}
                        </span>

                        <span className="shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                          × {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-5 dark:border-slate-800">
                  <span className="font-bold text-slate-600 dark:text-slate-300">
                    Order total
                  </span>

                  <span className="text-xl font-extrabold text-amber-700 dark:text-amber-400">
                    {order.total} ETB
                  </span>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}