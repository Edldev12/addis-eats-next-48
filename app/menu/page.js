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
    <main className="min-h-screen bg-stone-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      {/* Menu hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-800/30 via-slate-950 to-slate-950"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300 sm:text-sm">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-amber-400"
              />
              Fresh from our kitchen
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Explore our{" "}
              <span className="text-amber-400">menu.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Discover Ethiopian favorites, delicious meals, and
              refreshing drinks. Find something you love and make
              your next meal special.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-slate-200">
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                Authentic flavors
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                Something for everyone
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                Easy ordering
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu content */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400">
              Find your favorite
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Delicious choices
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              Browse our dishes or choose a category to get started.
            </p>
          </div>

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {filteredDishes.length}{" "}
            {filteredDishes.length === 1 ? "dish" : "dishes"} to explore
          </p>
        </div>
        <div className="space-y-7">
          {/* Categories above search */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
            <CategoryBar selectedCategory={selectedCategory} />
          </div>

          {/* Search and dishes */}
          <section className="min-w-0">
            <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-4">
              <SearchBox />
            </div>

            {filteredDishes.length > 0 ? (
              <DishList dishes={filteredDishes} />
            ) : (
              <div className="rounded-2xl border border-stone-200 bg-white px-6 py-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-10">
                <span
                  aria-hidden="true"
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl dark:bg-amber-400/10"
                >
                  🍽️
                </span>

                <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                  No dishes found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
                  There are no dishes in this category yet. Try selecting
                  another category to explore our menu.
                </p>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
