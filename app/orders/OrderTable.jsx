import Link from "next/link";
export default function OrderTable({ orders }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <table className="min-w-full text-left text-sm">
        <caption className="sr-only">
          Order history
        </caption>

        <thead className="bg-slate-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 font-semibold text-slate-900"
            >
              Order
            </th>

            <th
              scope="col"
              className="px-6 py-4 font-semibold text-slate-900"
            >
              Customer
            </th>

            <th
              scope="col"
              className="px-6 py-4 font-semibold text-slate-900"
            >
              Items
            </th>

            <th
              scope="col"
              className="px-6 py-4 font-semibold text-slate-900"
            >
              Status
            </th>

            <th
              scope="col"
              className="px-6 py-4 font-semibold text-slate-900"
            >
              Date
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 font-medium">
                <Link
                  href={`/track/${order.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {order.id.slice(0, 8)}
                </Link>
              </td>

              <td className="px-6 py-4">
                <div className="font-medium text-slate-900">
                  {order.name}
                </div>

                <div className="text-slate-500">
                  {order.phone}
                </div>
              </td>

              <td className="px-6 py-4 text-slate-600">
                {order.items?.map((item) => (
                  <div key={item.id}>
                    {item.name} × {item.quantity}
                  </div>
                ))}
              </td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold capitalize text-yellow-700">
                  {order.status}
                </span>
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                {new Date(order.createdAt).toLocaleDateString("en-ET")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}