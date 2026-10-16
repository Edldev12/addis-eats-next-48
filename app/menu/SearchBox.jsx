"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import Link from "next/link";

export default function SearchBox() {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term);
    }, 300);

    return () => clearTimeout(timer);
  }, [term]);

  const { data, error, isLoading } = useSWR(
    debouncedTerm
      ? `/api/dishes?q=${encodeURIComponent(debouncedTerm)}`
      : null,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className="w-full">
      <label
        htmlFor="dish-search"
        className="mb-3 block text-sm font-bold text-slate-800 dark:text-slate-200"
      >
        Search our menu
      </label>

      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-xl text-slate-400"
        >
          ⌕
        </span>

        <input
          id="dish-search"
          type="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search for kitfo, shiro, pizza..."
          autoComplete="off"
          className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-amber-400 dark:focus:bg-slate-800"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
        >
          Could not load search results. Please try again.
        </p>
      )}

      {isLoading && (
        <p
          role="status"
          className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400"
        >
          Searching dishes...
        </p>
      )}

      {data && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900">
          <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Search results
            </p>
          </div>

          {data.dishes?.length > 0 ? (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.dishes.map((dish) => (
                <li key={dish.id}>
                  <Link
                    href={`/menu/${dish.id}`}
                    className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-amber-50 dark:hover:bg-slate-800"
                  >
                    <div>
                      <span className="block font-semibold text-slate-800 dark:text-slate-100">
                        {dish.name}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                        View dish details →
                      </span>
                    </div>

                    <span className="shrink-0 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-extrabold text-amber-900 dark:bg-amber-400/10 dark:text-amber-300">
                      {dish.price} ETB
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
              No dishes found. Try another search.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
