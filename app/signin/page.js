import Link from "next/link";
import { signIn } from "@/app/actions";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = params?.next || "/";

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 py-12 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-white sm:px-6">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="h-2 bg-amber-400" />

          <div className="p-6 sm:p-8">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl dark:bg-amber-400/10">
                🍽️
              </span>

              <span className="text-left">
                <span className="block text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  Addis Eats
                </span>
                <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Delicious moments, delivered
                </span>
              </span>
            </Link>

            <div className="mt-8">
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
                Welcome back
              </span>

              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Sign in
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Sign in to view your orders and continue to checkout.
              </p>
            </div>

            <form action={signIn} className="mt-8 space-y-5">
              <input type="hidden" name="next" value={next} />

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="0911111111"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 font-extrabold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:translate-y-0"
              >
                Sign in <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className="mt-7 rounded-2xl border border-slate-200 bg-stone-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="flex items-center gap-2">
                <span aria-hidden="true">🔑</span>
                <h2 className="font-extrabold text-slate-900 dark:text-white">
                  Demo accounts
                </h2>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    Customer
                  </p>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    Phone: 0911111111
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Password: 123456
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    Staff
                  </p>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    Phone: 0922222222
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Password: 123456
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="mt-6 inline-flex min-h-10 w-full items-center justify-center rounded-xl text-sm font-bold text-slate-600 transition hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:text-slate-400 dark:hover:text-amber-400"
            >
              ← Back to home
            </Link>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-500 dark:text-slate-500">
          Made with care at Addis Eats.
        </p>
      </div>
    </main>
  );
}
