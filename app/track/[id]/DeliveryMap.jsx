
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

const defaultCourier = [8.9806, 38.7578];

const courierIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FitBounds({ courier, delivery }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds([courier, delivery], {
      padding: [40, 40],
      maxZoom: 15,
    });
  }, [map, courier, delivery]);

  return null;
}

export default function DeliveryMap({
  courier = defaultCourier,
  delivery = [8.995, 38.763],
}) {
  const validCoordinate = (point) =>
    Array.isArray(point) &&
    point.length === 2 &&
    point.every((value) => Number.isFinite(Number(value))) &&
    Math.abs(Number(point[0])) <= 90 &&
    Math.abs(Number(point[1])) <= 180;

  if (!validCoordinate(courier) || !validCoordinate(delivery)) {
    return (
      <p className="rounded-lg border p-4 text-sm">
        The delivery location is not available yet.
      </p>
    );
  }

  const courierPosition = courier.map(Number);
  const deliveryPosition = delivery.map(Number);

  return (
    <div className="h-[350px] w-full overflow-hidden rounded-xl">
      <MapContainer
        center={deliveryPosition}
        zoom={14}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds
          courier={courierPosition}
          delivery={deliveryPosition}
        />

        <Marker position={courierPosition} icon={courierIcon}>
          <Popup>Delivery courier (demo location)</Popup>
        </Marker>

        <Marker position={deliveryPosition} icon={courierIcon}>
          <Popup>Delivery destination</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
