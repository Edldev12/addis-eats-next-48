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

  const description = `${dish.name} — ETB ${dish.price}. ${dish.description}`;

  return {
    title: `${dish.name} | Addis Eats`,
    description,
    alternates: {
      canonical: `/menu/${dish.id}`,
    },
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description,
      type: "website",
      locale: "en_ET",
      images: [
        {
          url: `/menu/${dish.id}/opengraph-image`,
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
    <main className="min-h-screen bg-stone-50 px-5 py-8 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 sm:px-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="mx-auto max-w-5xl">
        <Link
          href="/menu"
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-amber-400 dark:hover:bg-slate-800 dark:hover:text-amber-300"
        >
          <span aria-hidden="true">←</span>
          Back to Menu
        </Link>

        <article className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative bg-slate-100 dark:bg-slate-800">
            {dish.image ? (
              <Image
                src={dish.image}
                alt={dish.name}
                width={1200}
                height={630}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
                priority
              />
            ) : (
              <div className="flex h-64 items-center justify-center text-sm font-medium text-slate-500 dark:text-slate-400 sm:h-80 lg:h-[420px]">
                No image available
              </div>
            )}

            {dish.category && (
              <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-slate-950/85 px-4 py-2 text-sm font-bold capitalize text-amber-300 backdrop-blur-sm sm:left-7 sm:top-7">
                {dish.category}
              </span>
            )}
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400">
                  Fresh from our kitchen
                </p>

                <h1 className="mt-3 break-words text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                  {dish.name}
                </h1>
              </div>

              <div className="w-fit shrink-0 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-400/20 dark:bg-amber-400/10">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Price
                </p>

                <p className="mt-1 whitespace-nowrap text-2xl font-extrabold text-amber-900 dark:text-amber-300">
                  ETB {dish.price}
                </p>
              </div>
            </div>

            <div className="mt-7 border-t border-slate-100 pt-6 dark:border-slate-800">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                About this dish
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                {dish.description}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/70 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="font-extrabold text-slate-900 dark:text-white">
                  Ready to enjoy it?
                </h2>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Add this dish to your cart and continue to checkout.
                </p>
              </div>

              <div className="shrink-0">
                <AddToCartButton dish={dish} />
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}