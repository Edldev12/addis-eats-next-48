"use client";

import Link from "next/link";

const categories = [
  { name: "All", value: "all" },
  { name: "Breakfast", value: "breakfast" },
  { name: "Lunch", value: "lunch" },
  { name: "Dinner", value: "dinner" },
  { name: "Fast Food", value: "fast-food" },
  { name: "Drinks", value: "drinks" },
];

export default function CategoryBar({ selectedCategory = "all" }) {
  return (<aside className="w-full rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:w-64 lg:shrink-0"> <h2 className="mb-4 text-lg font-bold text-slate-900">
    Categories </h2>


    <nav className="flex flex-col gap-2">
      {categories.map((category) => {
        const isActive = selectedCategory === category.value;

        return (
          <Link
            key={category.value}
            href={
              category.value === "all"
                ? "/menu"
                : `/menu?category=${category.value}`
            }
            className={`rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  </aside>


  );
}
