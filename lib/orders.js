const orders = new Map();

export async function getOrders() {
  return Array.from(orders.values());
}

export async function saveOrders(updatedOrders) {
  orders.clear();

  for (const order of updatedOrders) {
    orders.set(order.id, order);
  }
}
