export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-10 w-48 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-5 w-72 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="space-y-4 p-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-12 animate-pulse rounded bg-slate-200"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}