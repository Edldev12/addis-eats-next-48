import Link from "next/link";

const specials = [
  {
    id: "kitfo",
    name: "Kitfo",
    price: 450,
    description:
      "Traditional Ethiopian minced beef seasoned with spiced butter and mitmita.",
  },
  {
    id: "shiro",
    name: "Shiro",
    price: 250,
    description:
      "Smooth and flavorful chickpea stew prepared with Ethiopian spices.",
  },
  {
    id: "pizza",
    name: "Pizza",
    price: 500,
    description:
      "Freshly prepared pizza with a delicious combination of toppings.",
  },
];

export const metadata = {
  title: "Home",
  description:
    "Discover delicious Ethiopian food from Addis Eats and order your favorite meals quickly and easily across Addis Ababa.",
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Addis Eats",
  url: "https://addiseats.et",
  description:
    "Addis Eats delivers delicious Ethiopian food and popular meals across Addis Ababa.",
  servesCuisine: "Ethiopian",
  areaServed: "Addis Ababa",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Welcome to Addis Eats
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-900">
            Delicious Ethiopian Food,
            <span className="block text-slate-600">
              Made Simple.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Discover delicious meals from Addis Eats and order your
            favorite dishes quickly and easily.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Explore Menu
            </Link>

            <Link
              href="/cart"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>

      {/* Today's Specials */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Today&apos;s Specials
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Popular dishes
          </h2>

          <p className="mt-3 text-slate-600">
            Try one of our delicious dishes today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {specials.map((dish) => (
            <article
              key={dish.id}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-slate-900">
                  {dish.name}
                </h3>

                <span className="whitespace-nowrap font-semibold text-slate-900">
                  ETB {dish.price}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {dish.description}
              </p>

              <Link
                href={`/ menu / ${dish.id} `}
                className="mt-6 inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View Dish
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to order?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Browse our full menu and choose your favorite Ethiopian
            dishes.
          </p>

          <Link
            href="/menu"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100"
          >
            Browse Full Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
