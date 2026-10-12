export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          404
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Page not found
        </h1>

        <p className="mt-4 text-slate-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}