export default function Loading() {
  return (
    <main
      aria-label="Loading orders"
      aria-busy="true"
      className="min-h-screen bg-stone-50 px-5 py-10 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-white sm:px-6 sm:py-14"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <div className="h-4 w-24 animate-pulse rounded-full bg-amber-200 dark:bg-amber-400/20" />

          <div className="mt-4 h-10 w-48 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

          <div className="mt-4 h-5 w-full max-w-72 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 bg-stone-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="h-5 w-36 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="space-y-4 p-5 sm:p-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-slate-100 p-4 dark:border-slate-800"
              >
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-amber-100 dark:bg-amber-400/10" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-3/5 animate-pulse rounded bg-slate-100 dark:bg-slate-800/70" />
                </div>

                <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          Loading your orders...
        </p>
      </div>
    </main>
  );
}
