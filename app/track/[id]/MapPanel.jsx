"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-80 flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-stone-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:h-96"
      role="status"
      aria-live="polite"
    >
      <span className="h-9 w-9 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
      <div className="text-center">
        <p className="font-bold text-slate-900 dark:text-white">
          Loading delivery map
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Preparing your delivery locations...
        </p>
      </div>
    </div>
  ),
});

export default function MapPanel(props) {
  return <DeliveryMap {...props} />;
}