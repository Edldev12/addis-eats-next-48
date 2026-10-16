import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish, priority = false }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <Link
        href={`/menu/${dish.id}`}
        aria-label={`View details for ${dish.name}`}
        className="relative block overflow-hidden bg-slate-100 dark:bg-slate-800"
      >
        {dish.image ? (
          <Image
            src={dish.image}
            alt={dish.name}
            width={400}
            height={224}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            priority={priority}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-56 items-center justify-center bg-slate-100 text-sm font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            No image available
          </div>
        )}

        {dish.category && (
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1.5 text-xs font-bold capitalize text-amber-300 backdrop-blur-sm">
            {dish.category}
          </span>
        )}
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-amber-700 dark:text-white dark:group-hover:text-amber-400">
            {dish.name}
          </h2>

          <span className="shrink-0 whitespace-nowrap rounded-lg bg-amber-50 px-3 py-2 text-sm font-extrabold text-amber-900 dark:bg-amber-400/10 dark:text-amber-300">
            ETB {dish.price}
          </span>
        </div>

        {dish.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {dish.description}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <Link
            href={`/menu/${dish.id}`}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-amber-400 dark:hover:bg-slate-800 dark:hover:text-amber-300"
          >
            View Details →
          </Link>

          <AddToCartButton dish={dish} />
        </div>
      </div>
    </article>
  );
}