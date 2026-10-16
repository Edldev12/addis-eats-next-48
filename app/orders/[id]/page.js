import Link from "next/link";
import { getSession } from "@/lib/session";
import OrderStatus from "./OrderStatus";
import { getOrders } from "@/lib/orders";

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

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <main className="min-h-screen bg-stone-50 px-5 py-16 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl dark:bg-amber-400/10">
            📦
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
            Addis Eats
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Order not found
          </h1>

          <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600 dark:text-slate-400">
            We couldn’t find this order, or you may not have permission to
            view it.
          </p>

          <Link
            href="/menu"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-400 px-6 py-3 font-extrabold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            Browse Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-10 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-white sm:px-6 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-extrabold tracking-wide text-amber-700 transition hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <span aria-hidden="true">←</span>
            Addis Eats
          </Link>

          <div className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
              <span aria-hidden="true">●</span>
              Order tracking
            </span>

            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Track your order
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              Follow your order’s progress. Its status will update
              automatically while live tracking is connected.
            </p>
          </div>
        </header>

        <OrderStatus id={id} initial={order} />

        <footer className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-slate-900 dark:text-white">
              Hungry for something else?
            </p>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Explore more dishes from Addis Eats.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-amber-400 dark:hover:bg-slate-800 dark:hover:text-amber-300"
          >
            Explore Menu →
          </Link>
        </footer>
      </div>
    </main>
  );
}
