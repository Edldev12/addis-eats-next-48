import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-slate-900"
        >
          Addis Eats
        </Link>

        <nav aria-label="Main navigation">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              Home
            </Link>

            <Link
              href="/menu"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              Menu
            </Link>

            <Link
              href="/cart"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              Cart
            </Link>

            <Link
              href="/orders"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              Orders
            </Link>

            <Link
              href="/checkout"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Checkout
            </Link>

            <SignOutButton />
          </div>
        </nav>
      </div>
    </header>
  );
}