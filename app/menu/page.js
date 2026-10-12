import CategoryBar from "@/components/CategoryBar";
import DishList from "@/components/DishList";
import { getDishes } from "@/lib/dishes";
import SearchBox from "./SearchBox";

export const revalidate = 3600;
export const metadata = {
  title: "Menu",
  description:
    "Explore Ethiopian dishes including Kitfo, Shiro, and Pizza from Addis Eats, with delivery across Addis Ababa.",
  alternates: {
    canonical: "/menu",
  },
};
export default async function MenuPage({ searchParams }) {
  const dishes = getDishes();

  const params = await searchParams;
  const selectedCategory = params?.category || "all";

  const filteredDishes =
    selectedCategory === "all"
      ? dishes
      : dishes.filter(
        (dish) =>
          dish.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Addis Eats
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Our Menu
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Discover delicious dishes from our menu.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <CategoryBar selectedCategory={selectedCategory} />

          <section className="min-w-0 flex-1">
            <SearchBox />

            {filteredDishes.length > 0 ? (
              <DishList dishes={filteredDishes} />
            ) : (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">
                  No dishes found
                </h2>

                <p className="mt-2 text-slate-600">
                  Try selecting another category.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}