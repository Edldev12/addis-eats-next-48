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

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Addis Eats
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Order Status
          </h1>

          <p className="mt-3 text-slate-600">
            Your order status updates automatically.
          </p>
        </div>

        <OrderStatus id={id} initial={order} />
      </div>
    </main>
  );
}