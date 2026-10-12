import RevenueChart from "./RevenueChart";
import { getOrders } from "@/lib/orders";
const orders = await getOrders();

export default async function DashboardPage() {
  const revenueByDish = {};

  const ordersByDay = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt).toISOString().slice(0, 10);

    ordersByDay[date] = (ordersByDay[date] || 0) + 1;

    order.items.forEach((item) => {
      const dishName = item.name || item.dishId || "Unknown";

      const quantity = Number(item.quantity) || 1;
      const price = Number(item.price) || 0;

      revenueByDish[dishName] =
        (revenueByDish[dishName] || 0) + price * quantity;
    });
  });

  const revenueData = Object.entries(revenueByDish).map(
    ([dish, revenue]) => ({
      dish,
      revenue,
    })
  );

  const ordersOverTime = Object.entries(ordersByDay)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, orders]) => ({
      date,
      orders,
    }));

  return (
    <main>
      <h1>Dashboard</h1>

      <section>
        <h2>Revenue by Dish (ETB)</h2>

        <RevenueChart data={revenueData} />

        <table>
          <caption>Revenue by dish in Ethiopian Birr</caption>

          <thead>
            <tr>
              <th scope="col">Dish</th>
              <th scope="col">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {revenueData.map((item) => (
              <tr key={item.dish}>
                <td>{item.dish}</td>
                <td>
                  {item.revenue.toLocaleString("en-ET")} ETB
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Orders Over Time</h2>

        <RevenueChart data={ordersOverTime} />

        <table>
          <caption>Orders per day</caption>

          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Orders</th>
            </tr>
          </thead>

          <tbody>
            {ordersOverTime.map((item) => (
              <tr key={item.date}>
                <td>{item.date}</td>
                <td>{item.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}