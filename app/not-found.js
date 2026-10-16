import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-12 dark:bg-slate-950 sm:px-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-extrabold tracking-wide text-amber-700 transition hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-lg text-slate-950">
            🍽
          </span>
          ADDIS EATS
        </Link>

        <div className="mx-auto mt-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-100 text-5xl dark:bg-amber-400/10">
          🍽️
        </div>

        <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">
          Error 404
        </p>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Oops! Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-slate-600 dark:text-slate-400">
          Looks like this page is off the menu. It may have been moved or
          the link might be incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-400 px-5 py-3 font-extrabold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            Back to home
          </Link>

          <Link
            href="/menu"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Browse menu
          </Link>
        </div>

        <p className="mt-10 text-xs font-medium text-slate-400 dark:text-slate-500">
          Fresh food, just a few clicks away.
        </p>
      </div>
    </main>
  );
}