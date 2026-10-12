import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "orders.json");

export async function getOrders() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveOrders(orders) {
  await fs.writeFile(
    filePath,
    JSON.stringify(orders, null, 2),
    "utf8"
  );
}