import { getSession } from "@/lib/session";
import { getOrders } from "@/lib/orders";

export async function GET(request, { params }) {
  const user = await getSession();

  if (!user) {
    return new Response("Unauthorized.", { status: 401 });
  }

  const { id } = await params;
  const orders = await getOrders();
  const order = orders.find((item) => item.id === id);

  if (!order) {
    return new Response("Order not found.", { status: 404 });
  }

  if (user.role !== "staff" && order.userId !== user.id) {
    return new Response("Forbidden.", { status: 403 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      let interval;

      const send = (currentOrder) => {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              id: currentOrder.id,
              status: currentOrder.status,
              createdAt: currentOrder.createdAt,
            })}\n\n`
          )
        );
      };

      send(order);

      interval = setInterval(async () => {
        try {
          const currentOrders = await getOrders();
          const currentOrder = currentOrders.find(
            (item) => item.id === id
          );

          if (!currentOrder) {
            clearInterval(interval);
            controller.close();
            return;
          }

          send(currentOrder);

          if (currentOrder.status === "delivered") {
            clearInterval(interval);
            controller.close();
          }
        } catch {
          clearInterval(interval);
          controller.close();
        }
      }, 5000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);

        try {
          controller.close();
        } catch { }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}