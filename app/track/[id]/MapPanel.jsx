"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-80 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
      Loading delivery map...
    </div>
  ),
});

export default function MapPanel(props) {
  return <DeliveryMap {...props} />;
}