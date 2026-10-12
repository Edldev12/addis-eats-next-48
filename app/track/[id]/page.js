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
      <main className="min-h-screen bg-slate-50 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-slate-900">
            Order not found
          </h1>
          <p className="mt-3 text-slate-600">
            We could not find this order.
          </p>
        </div>
      </main>
    );
  }

  const courier = [8.9806, 38.7578];
  const delivery = [8.995, 38.763];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Addis Eats
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Track Your Delivery
          </h1>

          <p className="mt-3 text-slate-600">
            Order #{order.id.slice(0, 8)}
          </p>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">
            Delivery Map
          </h2>

          <p className="mt-2 text-slate-600">
            The map shows the courier and delivery location.
          </p>

          <div className="mt-6">
            <MapPanel courier={courier} delivery={delivery} />
          </div>
          <div className="mt-6">
            <OrderStatus id={id} initial={order} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Courier
              </h3>
              <p className="mt-1 text-slate-600">
                Current courier location on the map.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Delivery address
              </h3>
              <p className="mt-1 text-slate-600">
                Your delivery location on the map.
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">

            <Link
              href="/orders"
              className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-700 ring-1 ring-slate-200"
            >
              Order History
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
