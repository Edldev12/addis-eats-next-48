"use client";

export default function Error({ reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 py-14 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-white sm:px-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-4xl dark:bg-amber-400/10">
          🍽️
        </div>

        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
          Addis Eats
        </p>

        <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Something went wrong
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
          We couldn&apos;t load your orders right now. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-extrabold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:translate-y-0"
        >
          <span aria-hidden="true">↻</span>
          Try again
        </button>
      </div>
    </main>
  );
}
