import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish, priority = false }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      {dish.image ? (
        <Image
          src={dish.image}
          alt={dish.name}
          width={400}
          height={224}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          priority={priority}
          className="h-56 w-full object-cover"
        />
      ) : (
        <div className="flex h-56 items-center justify-center bg-slate-200 text-slate-500">
          No image
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900">
            {dish.name}
          </h2>

          <span className="whitespace-nowrap font-semibold text-slate-900">
            ETB {dish.price}
          </span>
        </div>

        {dish.category && (
          <p className="mt-2 text-sm font-medium text-slate-500">
            {dish.category}
          </p>
        )}

        {dish.description && (
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {dish.description}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/menu/${dish.id}`}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            View Details
          </Link>

          <AddToCartButton dish={dish} />
        </div>
      </div>
    </article>
  );
}
