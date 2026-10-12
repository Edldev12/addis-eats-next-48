import { ImageResponse } from "next/og";
import { getDishById } from "@/lib/dishes";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;

  const dish = getDishById(id);

  if (!dish) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0f172a",
            color: "white",
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          Addis Eats
        </div>
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px",
          background: "#0f172a",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: "#94a3b8",
            marginBottom: 20,
          }}
        >
          Addis Eats · {dish.category}
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          {dish.name}
        </div>

        <div
          style={{
            fontSize: 42,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          ETB {dish.price}
        </div>

        <div
          style={{
            fontSize: 28,
            color: "#cbd5e1",
            maxWidth: 1000,
          }}
        >
          {dish.description}
        </div>
      </div>
    ),
    size
  );
}