
import Image from "next/image";
import Link from "next/link";

const specials = [
  {
    id: "kitfo",
    name: "Kitfo",
    category: "Ethiopian favorite",
    price: 450,
    description:
      "Traditional Ethiopian minced beef seasoned with spiced butter and mitmita.",
    image: "/images/kitfo.jpg",
  },
  {
    id: "doro-wot",
    name: "Doro Wot",
    category: "Traditional",
    price: 400,
    description:
      "A rich, spicy chicken stew prepared with berbere and Ethiopian spices.",
    image: "/images/Doro-wet.jpg",
  },
  {
    id: "spris",
    name: "Spris",
    category: "Fresh drinks",
    price: 180,
    description:
      "A refreshing Ethiopian-style mixed fruit juice.",
    image: "/images/spric.jpg",
  },
];

export const metadata = {
  title: "Home",
  description:
    "Discover Ethiopian food, traditional favorites, and refreshing drinks at Addis Eats. Explore the menu and order your favorite meals.",
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
    "Discover Ethiopian food, traditional favorites, and popular meals with Addis Eats.",
  servesCuisine: "Ethiopian",
  areaServed: "Addis Ababa",
};

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Hero */}
      <section className="relative isolate bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/40 via-slate-950 to-slate-950"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              A taste of Ethiopia
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Your favorite food,
              <span className="mt-2 block text-amber-400">
                made special.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              From authentic Ethiopian dishes to refreshing fruit
              drinks, discover something delicious with Addis Eats.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/menu"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 dark:text-white transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
              >
                Explore Our Menu
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>

              <Link
                href="/cart"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                View Your Cart
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-300">
              <span>Authentic flavors</span>
              <span>Fresh favorites</span>
              <span>Simple ordering</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-amber-400/10 blur-2xl"
            />

            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
              <Image
                src="/images/hero.jpg"
                alt="A selection of delicious food at Addis Eats"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 sm:p-7">
                <p className="text-sm font-medium text-amber-300">
                  Made for your cravings
                </p>
                <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  Discover your next favorite
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured dishes */}
      <section
        aria-labelledby="specials-heading"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
              A little something delicious
            </p>

            <h2
              id="specials-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl"
            >
              Favorites worth trying
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-slate-600 dark:text-slate-300">
              Explore traditional flavors and refreshing drinks
              selected for your next meal.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex min-h-11 items-center gap-2 self-start font-bold text-amber-800 hover:text-amber-950 sm:self-auto"
          >
            See full menu
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {specials.map((dish) => (
            <article
              key={dish.id}
              className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Link
                href={`/menu/${dish.id}`}
                className="block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-amber-600"
                aria-label={`View ${dish.name}, ETB ${dish.price}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-slate-800">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
                    {dish.category}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-slate-950">
                      {dish.name}
                    </h3>

                    <span className="shrink-0 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-extrabold text-amber-900 dark:bg-amber-400/15 dark:text-amber-300">
                      ETB {dish.price}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {dish.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-800 group-hover:text-amber-950">
                    View dish
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="px-5 pb-14 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-amber-400 px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-amber-950/70">
                Your next meal starts here
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                What are you craving today?
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-slate-800">
                Browse the menu, find something you love, and get
                started with a few simple steps.
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 px-6 py-3 font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
            >
              Browse the Menu
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
