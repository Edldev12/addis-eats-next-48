import Link from "next/link";
import { signIn } from "@/app/actions";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = params?.next || "/";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-14">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Addis Eats
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Sign in
          </h1>

          <p className="mt-3 text-slate-600">
            Sign in to view your orders and checkout.
          </p>

          <form action={signIn} className="mt-8 space-y-5">
            <input
              type="hidden"
              name="next"
              value={next}
            />

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="0911111111"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="123456"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">
              Demo accounts
            </p>

            <p className="mt-2">
              Customer: 0911111111 / 123456
            </p>

            <p>
              Staff: 0922222222 / 123456
            </p>
          </div>

          <Link
            href="/"
            className="mt-6 block text-center text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
