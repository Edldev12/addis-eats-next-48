import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { getDishById, getDishes } from "@/lib/dishes";

export function generateStaticParams() {
  const dishes = getDishes();

  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  const dish = getDishById(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested dish could not be found.",
    };
  }

  return {
    title: dish.name,
    description: `${dish.name} — ETB ${dish.price}. ${dish.description} `,
    alternates: {
      canonical: `/ menu / ${dish.id} `,
    },
    openGraph: {
      title: `${dish.name} · Addis Eats`,
      description: `${dish.name} — ETB ${dish.price}. ${dish.description} `,
      type: "website",
      locale: "en_ET",
      images: [
        {
          url: `/ menu / ${dish.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${dish.name} — Addis Eats`,
        },
      ],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <Link
        href="/menu"
        className="inline-block text-sm font-semibold text-slate-600 hover:text-slate-900"
      >
        ← Back to Menu
      </Link>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {dish.image ? (
          <Image
            src={dish.image}
            alt={dish.name}
            width={1200}
            height={288}
            sizes="(max-width: 768px) 100vw, 1200px"
            className="h-72 w-full object-cover"
          />
        ) : (
          <div className="flex h-72 items-center justify-center bg-slate-200 text-slate-500">
            No image available
          </div>
        )}

        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {dish.category}
              </p>

              <h1 className="mt-2 text-4xl font-bold text-slate-900">
                {dish.name}
              </h1>
            </div>

            <p className="text-2xl font-bold text-slate-900">
              ETB {dish.price}
            </p>
          </div>

          <p className="mt-6 max-w-2xl leading-7 text-slate-600">
            {dish.description}
          </p>

          <div className="mt-8">
            <AddToCartButton dish={dish} />
          </div>
        </div>
      </div>
    </main>
  );
}
