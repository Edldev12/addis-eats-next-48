"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center bg-stone-50 px-6 py-12 text-center dark:bg-slate-950">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-100 text-4xl dark:bg-red-950/40">
        🍽️
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
        Something went wrong
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
        We couldn’t load the menu right now. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 shadow-sm transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
      >
        Try again
      </button>
    </div>
  );
}