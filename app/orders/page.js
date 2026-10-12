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

    return sort === "oldest"
      ? dateA - dateB
      : dateB - dateA;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedOrders.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);

  const start = (currentPage - 1) * PAGE_SIZE;

  const orders = sortedOrders.slice(
    start,
    start + PAGE_SIZE
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Addis Eats
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Orders
          </h1>

          <p className="mt-3 text-slate-600">
            Check your recent orders and their status.
          </p>
        </div>

        {userOrders.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">
              No orders yet
            </h2>

            <p className="mt-3 text-slate-600">
              Browse the menu to place your first order.
            </p>

            <Link
              href="/menu"
              className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap gap-3">
              <Link
                href="/orders?sort=newest&page=1"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Newest first
              </Link>

              <Link
                href="/orders?sort=oldest&page=1"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200"
              >
                Oldest first
              </Link>

              <ExportCsvButton orders={orders} />
            </div>
            <OrderTable orders={orders} />

            <nav
              aria-label="Order history pagination"
              className="mt-6 flex items-center justify-between"
            >
              {currentPage > 1 ? (
                <Link
                  href={`/orders?sort=${sort}&page=${currentPage - 1}`}
                  className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-700 ring-1 ring-slate-200"
                >
                  ← Previous
                </Link>
              ) : (
                <span />
              )}

              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={`/orders?sort=${sort}&page=${currentPage + 1}`}
                  className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-700 ring-1 ring-slate-200"
                >
                  Next →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </>
        )}
      </div>
    </main>
  );
}