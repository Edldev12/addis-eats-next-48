"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

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
    <div className="mb-8">
      <input
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search dishes..."
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      />

      {error && (
        <p className="mt-3 text-sm text-red-600">
          Could not load search results.
        </p>
      )
      }

      {
        isLoading && (
          <p className="mt-3 text-sm text-slate-500">
            Searching...
          </p>
        )
      }

      {
        data && (
          <div className="mt-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            {data.dishes?.length > 0 ? (
              <ul className="space-y-2">
                {data.dishes.map((dish) => (
                  <li
                    key={dish.id}
                    className="rounded-lg p-2 hover:bg-slate-50"
                  >
                    <span className="font-medium text-slate-900">
                      {dish.name}
                    </span>

                    <span className="ml-2 text-slate-500">
                      {dish.price} ETB
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">
                No dishes found.
              </p>
            )}
          </div>
        )
      }
    </div >
  );
}