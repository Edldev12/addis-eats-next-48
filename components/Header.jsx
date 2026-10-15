
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/menu", label: "Menu", icon: "🍽️" },
  { href: "/cart", label: "Cart", icon: "🛒" },
  { href: "/orders", label: "Orders", icon: "📦" },
];

export default function Header() {
  return (
    <>
      {/* Top header: logo and theme only on mobile */}
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Addis Eats home"
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-xl font-black text-slate-950">
              A
            </span>
            <span>
              <span className="block text-lg font-extrabold text-slate-950 dark:text-white">
                Addis Eats
              </span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                A taste of Ethiopia
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <ThemeToggle />
            </div>

            {/* Desktop navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-1 md:flex"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {item.label}
                </Link>
              ))}

              <SignOutButton />
            </nav>

            {/* Desktop theme toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation: all navigation actions */}
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-950/95 md:hidden"
      >
        <div className="flex items-center justify-around gap-1 px-1 py-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-1 py-2 text-xs font-semibold text-slate-600 hover:bg-amber-50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <span aria-hidden="true" className="text-lg">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="flex min-w-0 flex-1 justify-center overflow-hidden">
            <SignOutButton />
          </div>
        </div>
      </nav>
    </>
  );
}
