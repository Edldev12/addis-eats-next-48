import Link from "next/link";
import MapPanel from "./MapPanel";
import { getSession } from "@/lib/session";
import { getOrders } from "@/lib/orders";
import OrderStatus from "@/app/orders/[id]/OrderStatus";

async function getOrder(id) {
  const user = await getSession();

  if (!user) {
    return null;
  }

  const orders = await getOrders();
  const order = orders.find((item) => item.id === id);

  if (!order) {
    return null;
  }

  const isOwner = order.userId === user.id;
  const isStaff = user.role === "staff";

  if (!isOwner && !isStaff) {
    return null;
  }

  return order;
}

export default async function TrackPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-12 dark:bg-slate-950 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-12">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl dark:bg-amber-400/10">
            📦
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Order not found
          </h1>

          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
            We couldn&apos;t find this order, or you may not have permission
            to view it.
          </p>

          <Link
            href="/orders"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            View my orders
          </Link>
        </div>
      </main>
    );
  }

  const courier = [8.9806, 38.7578];
  const delivery = [8.995, 38.763];

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10 dark:bg-slate-950 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-extrabold tracking-wide text-amber-700 transition hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-lg text-slate-950">
              🍽
            </span>
            ADDIS EATS
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Delivery updates
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Track your delivery
              </h1>

              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Follow your order&apos;s progress from preparation to delivery.
              </p>
            </div>

            <div className="w-fit rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-400/20 dark:bg-amber-400/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">
                Order number
              </p>
              <p className="mt-1 font-mono text-lg font-extrabold text-slate-900 dark:text-white">
                #{order.id.slice(0, 8)}
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xl dark:bg-amber-400/10">
                  📍
                </span>

                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Delivery location
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    View the courier and delivery destination on the map.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-5">
              <MapPanel courier={courier} delivery={delivery} />
              {order.address && (
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">Delivery address: </span>
                  {order.address}
                </p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-5">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Order progress
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Your order status updates as new events arrive.
              </p>
            </div>

            <OrderStatus id={id} initial={order} />
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-2xl dark:bg-amber-400/10">
                🛵
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Courier location
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  See the courier marker on the delivery map.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-2xl dark:bg-amber-400/10">
                🏠
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Delivery destination
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  View the destination marker for this order.
                </p>
              </div>
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
            <Link
              href="/orders"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              ← Order history
            </Link>

            <Link
              href="/menu"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-400 px-5 py-3 font-extrabold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              Order more food →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}