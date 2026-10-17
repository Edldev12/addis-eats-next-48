"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const DeliveryLocationMap = dynamic(
  () => import("./LocationPickerMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[350px] items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
        Loading map...
      </div>
    ),
  }
);

export default function LocationPicker({
  latitude,
  longitude,
  onLocationChange,
  address,
}) {
  const [locating, setLocating] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchAddress, setSearchAddress] = useState(address || "");
  const [locationError, setLocationError] = useState("");
  const [locationMessage, setLocationMessage] = useState("");

  async function findAddress(event) {


    const query = searchAddress.trim();

    if (query.length < 3) {
      setLocationError("Enter a more specific delivery address.");
      return;
    }

    setSearching(true);
    setLocationError("");
    setLocationMessage("");

    try {
      const response = await fetch(
        `/api/geocode?address=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not find that address.");
      }

      onLocationChange({
        latitude: data.latitude,
        longitude: data.longitude,
      });

      setLocationMessage(
        `Address found: ${data.displayName}`
      );
    } catch (error) {
      setLocationError(
        error.message || "Address search failed. Please try again."
      );
    } finally {
      setSearching(false);
    }
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      setLocationError("Your browser does not support location detection.");
      return;
    }

    setLocating(true);
    setLocationError("");
    setLocationMessage("Requesting your current location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationChange({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocating(false);
        setLocationMessage("Your current location was detected.");
      },
      (error) => {
        setLocating(false);

        if (error.code === 1) {
          setLocationError("Location permission was denied. You can search your address or select a point on the map.");
        } else if (error.code === 2) {
          setLocationError("Your location is unavailable. Search your address or select a point on the map.");
        } else {
          setLocationError("Location detection timed out. Try again or select a point on the map.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }

  return (
    <section className="space-y-3">
      <div>
        <h3 className="font-bold text-slate-800 dark:text-white">
          Your delivery location
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Enter your checkout address and find it on the map, or click the map
          to choose the exact delivery point.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={searchAddress}
          onChange={(event) => setSearchAddress(event.target.value)}
          placeholder="e.g. Bole, Addis Ababa, Ethiopia"
          maxLength={200}
          className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        <button
          type="button"
          onClick={findAddress}
          disabled={searching}
          className="rounded-xl bg-amber-500 px-5 py-3 font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-50"
        >
          {searching ? "Searching..." : "Find address"}
        </button>
      </div>

      <button
        type="button"
        onClick={detectLocation}
        disabled={locating}
        className="rounded-xl border border-amber-400 px-4 py-2 text-sm font-bold text-slate-800 hover:bg-amber-50 disabled:opacity-50 dark:text-white dark:hover:bg-slate-800"
      >
        {locating ? "Detecting location..." : "Detect my location"}
      </button>

      {locationMessage && (
        <p role="status" className="break-words text-sm text-emerald-700 dark:text-emerald-400">
          {locationMessage}
        </p>
      )}

      {locationError && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {locationError}
        </p>
      )}

      <DeliveryLocationMap
        latitude={latitude}
        longitude={longitude}
        onLocationChange={(point) => {
          onLocationChange(point);
          setLocationError("");
          setLocationMessage("Delivery point selected on the map.");
        }}
      />

      {latitude != null && longitude != null ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Selected coordinates: {latitude.toFixed(5)}, {longitude.toFixed(5)}
        </p>
      ) : (
        <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
          Search your address or select a delivery point on the map.
        </p>
      )}
    </section>
  );
}