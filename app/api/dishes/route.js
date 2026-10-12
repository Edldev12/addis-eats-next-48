import { getDishes } from "@/lib/dishes";

export async function GET(request) {
  const dishes = getDishes();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  const filteredDishes = query
    ? dishes.filter((dish) =>
      dish.name.toLowerCase().includes(query)
    )
    : dishes;

  return Response.json({
    dishes: filteredDishes,
  });
}
