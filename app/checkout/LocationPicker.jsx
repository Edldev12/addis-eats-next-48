
"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultPosition = [8.9806, 38.7578];

const deliveryIcon = L.divIcon({
  className: "",
  html: `<div style="
    width: 28px;
    height: 28px;
    background: #f59e0b;
    border: 3px solid white;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 2px 8px #0005;
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

function LocationMarker({ position, onLocationChange }) {
  useMapEvents({
    click(event) {
      onLocationChange([event.latlng.lat, event.latlng.lng]);
    },
  });

  return <Marker position={position} icon={deliveryIcon} />;
}

export default function LocationPicker({
  onLocationChange,
}) {
  const [position, setPosition] = useState(defaultPosition);

  function handleLocationChange(nextPosition) {
    setPosition(nextPosition);
    onLocationChange?.({
      latitude: nextPosition[0],
      longitude: nextPosition[1],
    });
  }

  return (
    <div>
      <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">
        Click the map to select your delivery location.
      </p>

      <div className="overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700">
        <MapContainer
          center={defaultPosition}
          zoom={13}
          scrollWheelZoom
          style={{ height: "320px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker
            position={position}
            onLocationChange={handleLocationChange}
          />
        </MapContainer>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Selected coordinates: {position[0].toFixed(5)},{" "}
        {position[1].toFixed(5)}
      </p>
    </div>
  );
}
