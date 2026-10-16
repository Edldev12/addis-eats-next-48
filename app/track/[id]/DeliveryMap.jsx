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
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.jpg",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.jpg",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.jpg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FitBounds({ courier, delivery }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([courier, delivery]);
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, courier, delivery]);

  return null;
}

export default function DeliveryMap({
  courier = [8.9806, 38.7578],
  delivery = [8.995, 38.763],
}) {
  return (
    <div className="h-80 w-full overflow-hidden rounded-2xl">
      <MapContainer
        center={courier}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.jpg"
        />

        <Marker position={courier} icon={courierIcon}>
          <Popup>Courier location</Popup>
        </Marker>

        <Marker position={delivery} icon={courierIcon}>
          <Popup>Delivery address</Popup>
        </Marker>

        <FitBounds courier={courier} delivery={delivery} />
      </MapContainer>
    </div>
  );
}