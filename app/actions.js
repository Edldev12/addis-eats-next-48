"use server";
import { getOrders, saveOrders } from "@/lib/orders";
import { redirect } from "next/navigation";
import { validateOrder } from "@/lib/validation";
import {
  createSession,
  getSession,
  clearSession,
} from "@/lib/session";

// Demo users for Day 42
const users = [
  {
    id: "user-1",
    name: "Admin",
    phone: "0900000000",
    password: "ChangeMe123!",
    role: "admin",
  },
  {
    id: "user-2",
    name: "Edlawit",
    phone: "0911111111",
    password: "123456",
    role: "customer",
  },
  {
    id: "user-3",
    name: "Staff User",
    phone: "0922222222",
    password: "123456",
    role: "staff",
  },
  {
    id: "user-4",
    name: "Test Customer",
    phone: "0933333333",
    password: "123456",
    role: "customer",
  },
];

export async function signIn(formData) {
  const phone = String(formData.get("phone") || "").trim();
  const password = String(formData.get("password") || "");

  const user = users.find(
    (item) =>
      item.phone === phone &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      error: "Invalid phone number or password.",
    };
  }

  await createSession({
    id: user.id,
    name: user.name,
    role: user.role,
  });

  const next = String(formData.get("next") || "/");

  // Prevent open redirects.
  if (!next.startsWith("/") || next.startsWith("//")) {
    redirect("/");
  }

  // Redirect users based on their role.
  if (user.role === "admin") {
    redirect("/admin");
  }

  if (user.role === "staff") {
    redirect("/kitchen");
  }

  redirect(next);
}

export async function signOut() {
  await clearSession();
  redirect("/");
}

export async function placeOrder(formData) {
  const user = await getSession();

  if (!user) {
    throw new Error("Not signed in");
  }

  const name = formData.get("name");
  const phone = formData.get("phone");
  const itemsValue = formData.get("items");

  let items = [];

  try {
    items = itemsValue ? JSON.parse(itemsValue) : [];
  } catch {
    return {
      success: false,
      fieldErrors: {
        items: "Invalid cart data.",
      },
    };
  }

  const result = validateOrder({
    name,
    phone,
    items,
  });

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.fieldErrors,
    };
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

  return {
    success: true,
    message: "Order placed successfully.",
    order,
  };
}
