"use client";

import Link from "next/link";

const categories = [
  { name: "All", value: "all", icon: "🍽️" },
  { name: "Breakfast", value: "breakfast", icon: "🍳" },
  { name: "Lunch", value: "lunch", icon: "🍛" },
  { name: "Dinner", value: "dinner", icon: "🍲" },
  { name: "Fast Food", value: "Fast Food", icon: "🍕" },
  { name: "Traditional", value: "traditional", icon: "🥘" },
  { name: "Drinks", value: "drinks", icon: "🥤" },
];

export default function CategoryBar({ selectedCategory = "all" }) {
  return (
    <section className="w-full min-w-0">
      <div className="mb-3">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
          Browse categories
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          What are you craving today?
        </p>
      </div>

      <nav
        aria-label="Food categories"
        className="flex gap-3 overflow-x-auto pb-3 pt-1 pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300/50 dark:scrollbar-thumb-slate-700/50"
      >
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
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition-colors duration-200 focus-visible: outline-2 focus-visible: outline-offset-2 focus-visible: outline-amber-500 ${isActive
                ? "border-amber-400 bg-amber-400 text-slate-950 shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-amber-400 dark:hover:bg-slate-800"
                } `}
            >
              <span aria-hidden="true">{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
