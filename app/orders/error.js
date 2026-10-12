"use client";

export default function Error({ reset }) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-14">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-slate-600">
          We could&apos;t load your orders. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}