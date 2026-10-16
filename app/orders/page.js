import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import OrderTable from "./OrderTable";
import ExportCsvButton from "./ExportCsvButton";
import { getOrders } from "@/lib/orders";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

export default async function OrdersPage({ searchParams }) {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/orders");
  }

  const params = await searchParams;

  const page = Math.max(
    1,
    Number.parseInt(params?.page || "1", 10) || 1
  );

  const sort = params?.sort === "oldest" ? "oldest" : "newest";

  const allOrders = await getOrders();

  const userOrders =
    user.role === "staff"
      ? allOrders
      : allOrders.filter((order) => order.userId === user.id);

  const sortedOrders = [...userOrders].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return sort === "oldest" ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedOrders.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const orders = sortedOrders.slice(start, start + PAGE_SIZE);

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-10 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-white sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 sm:mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-extrabold tracking-wide text-amber-700 transition hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <span aria-hidden="true">←</span>
            Addis Eats
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
                {user.role === "staff" ? "Staff dashboard" : "Your account"}
              </span>

              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                Order History
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                {user.role === "staff"
                  ? "Review customer orders, check their status, and export order records."
                  : "Keep track of your orders and follow their progress."}
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 sm:self-auto"
            >
              Browse Menu <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        {userOrders.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-10 sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl dark:bg-amber-400/10">
              📦
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-slate-900 dark:text-white">
              No orders yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              {user.role === "staff"
                ? "There are no orders to display right now."
                : "You haven't placed an order yet. Explore the menu and discover your next favorite meal."}
            </p>

            <Link
              href="/menu"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-400 px-6 py-3 font-extrabold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <>
            <section
              aria-label="Order history controls"
              className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-extrabold text-slate-900 dark:text-white">
                    All orders
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {sortedOrders.length} total{" "}
                    {sortedOrders.length === 1 ? "order" : "orders"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href="/orders?sort=newest&page=1"
                    aria-current={sort === "newest" ? "page" : undefined}
                    className={`inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${sort === "newest"
                      ? "bg-amber-400 text-slate-950"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      } `}
                  >
                    Newest first
                  </Link>

                  <Link
                    href="/orders?sort=oldest&page=1"
                    aria-current={sort === "oldest" ? "page" : undefined}
                    className={`inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${sort === "oldest"
                      ? "bg-amber-400 text-slate-950"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      } `}
                  >
                    Oldest first
                  </Link>

                  <ExportCsvButton orders={orders} />
                </div>
              </div>
            </section>

            <OrderTable orders={orders} />

            <nav
              aria-label="Order history pagination"
              className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:px-5"
            >
              {currentPage > 1 ? (
                <Link
                  href={`/orders?sort=${sort}&page=${currentPage - 1}`}
                  rel="prev"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-amber-400 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ← Previous
                </Link>
              ) : (
                <span />
              )}

              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Page{" "}
                <span className="text-slate-900 dark:text-white">
                  {currentPage}
                </span>{" "}
                of {totalPages}
              </p>

              {currentPage < totalPages ? (
                <Link
                  href={`/orders?sort=${sort}&page=${currentPage + 1}`}
                  rel="next"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  Next →
                </Link>
              ) : (
                <span />
              )}
            </nav>

            <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
              Showing {start + 1}–{start + orders.length} of{" "}
              {sortedOrders.length} orders
            </p>
          </>
        )}
      </div>
    </main>
  );
}
