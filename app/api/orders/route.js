import { validateOrder } from "@/lib/validation";
import { getSession } from "@/lib/session";
import { getOrders, saveOrders } from "@/lib/orders";

export async function GET() {
  const user = await getSession();

  if (!user) {
    return Response.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  const orders = await getOrders();

  const userOrders =
    user.role === "staff"
      ? orders
      : orders.filter((order) => order.userId === user.id);

  return Response.json({
    orders: userOrders,
  });
}

export async function POST(request) {
  const user = await getSession();

  if (!user) {
    return Response.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const result = validateOrder(body);

    if (!result.success) {
      return Response.json(
        {
          error: "Validation failed.",
          fieldErrors: result.fieldErrors,
        },
        {
          status: 422,
        }
      );
    }

    const orders = await getOrders();

    const order = {
      id: crypto.randomUUID(),
      userId: user.id,
      ...result.data,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    await saveOrders(orders);

    return Response.json(
      {
        message: "Order created successfully.",
        order,
      },
      {
        status: 201,
      }
    );
  } catch {
    return Response.json(
      {
        error: "Invalid JSON request.",
      },
      {
        status: 400,
      }
    );
  }
}