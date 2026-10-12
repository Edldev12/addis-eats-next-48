import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getOrders } from "@/lib/orders";

export async function GET(request, { params }) {
  const user = await getSession();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const orders = await getOrders();
  const order = orders.find((item) => item.id === id);

  if (!order) {
    return NextResponse.json(
      { error: "Order not found." },
      { status: 404 }
    );
  }

  const isOwner = order.userId === user.id;
  const isStaff = user.role === "staff";

  if (!isOwner && !isStaff) {
    return NextResponse.json(
      { error: "Forbidden." },
      { status: 403 }
    );
  }

  return NextResponse.json(order);
}