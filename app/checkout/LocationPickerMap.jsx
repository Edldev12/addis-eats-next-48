
"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

const addisAbaba = [8.9806, 38.7578];

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapClickHandler({ onLocationChange }) {
  useMapEvents({
    click(event) {
      onLocationChange({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
}

function MapCenter({ latitude, longitude }) {
  const map = useMapEvents({});

  useEffect(() => {
    if (latitude != null && longitude != null) {
      map.flyTo([latitude, longitude], Math.max(map.getZoom(), 15));
    }
  }, [latitude, longitude, map]);

  return null;
}

export default function LocationPickerMap({
  latitude,
  longitude,
  onLocationChange,
}) {
  const hasLocation = latitude != null && longitude != null;
  const position = hasLocation
    ? [latitude, longitude]
    : addisAbaba;

  return (
    <div className="h-[350px] w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onLocationChange={onLocationChange} />
        <MapCenter latitude={latitude} longitude={longitude} />

        {hasLocation && (
          <Marker position={position} icon={markerIcon} />
        )}
      </MapContainer>
    </div>
  );
}
