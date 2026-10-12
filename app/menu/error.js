"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-bold text-red-600">
        Something went wrong
      </h2>

      <p className="mt-2 text-slate-600">
        We could not load the menu.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-slate-900 px-5 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}