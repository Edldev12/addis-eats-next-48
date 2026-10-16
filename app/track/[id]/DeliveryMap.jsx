"use client";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import { useEffect } from "react";

const courierIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function FitBounds({ courier, delivery }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([courier, delivery]);

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 15,
    });
  }, [map, courier, delivery]);

  return null;
}

export default function DeliveryMap({
  courier = [8.9806, 38.7578],
  delivery = [8.995, 38.763],
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 dark:border-slate-800 sm:px-5">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            Delivery map
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View the courier and delivery destination.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900 dark:bg-amber-400/10 dark:text-amber-300">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          Live order tracking
        </span>
      </div>

      <div className="relative h-80 w-full sm:h-96">
        <MapContainer
          center={courier}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={courier} icon={courierIcon}>
            <Popup>
              <strong>Courier location</strong>
              <br />
              Courier position
            </Popup>
          </Marker>

          <Marker position={delivery} icon={courierIcon}>
            <Popup>
              <strong>Delivery address</strong>
              <br />
              Destination
            </Popup>
          </Marker>

          <FitBounds courier={courier} delivery={delivery} />
        </MapContainer>
      </div>

      <div className="grid grid-cols-1 gap-3 border-t border-slate-200 p-4 dark:border-slate-800 sm:grid-cols-2 sm:p-5">
        <div className="flex items-center gap-3 rounded-xl bg-stone-50 p-3 dark:bg-slate-800">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg dark:bg-amber-400/10">
            🛵
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Courier
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Current courier marker
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-stone-50 p-3 dark:bg-slate-800">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg dark:bg-amber-400/10">
            📍
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Destination
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Delivery address marker
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}