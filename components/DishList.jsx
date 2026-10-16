import DishCard from "./DishCard";

export default function DishList({ dishes = [] }) {
  if (dishes.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl dark:bg-amber-400/10">
          🍽️
        </span>

        <h2 className="mt-5 text-xl font-extrabold text-slate-900 dark:text-white">
          No dishes found
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
          There are no dishes available in this category yet. Try
          choosing another category to explore our menu.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {dishes.map((dish, index) => (
        <DishCard
          key={dish.id}
          dish={dish}
          priority={index === 0}
        />
      ))}
    </div>
  );
}