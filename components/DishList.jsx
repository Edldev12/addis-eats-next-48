import DishCard from "./DishCard";

export default function DishList({ dishes = [] }) {
  if (dishes.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">
          No dishes found
        </h2>

        <p className="mt-2 text-slate-600">
          There are no dishes available for this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
