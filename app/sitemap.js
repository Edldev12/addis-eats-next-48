import { getDishes } from "@/lib/dishes";

export default function sitemap() {
  const dishes = getDishes();

  return [
    {
      url: "https://addiseats.et/",
      priority: 1,
    },
    {
      url: "https://addiseats.et/menu",
      priority: 0.8,
    },
    ...dishes.map((dish) => ({
      url: `https://addiseats.et/menu/${dish.id}`,
      priority: 0.7,
    })),
  ];
}