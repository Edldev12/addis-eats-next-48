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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "76px",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 65%, #422006 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "14px",
            height: "100%",
            background: "#fbbf24",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 700,
            color: "#fbbf24",
            marginBottom: 28,
          }}
        >
          ADDIS EATS
          <span style={{ color: "#cbd5e1", marginLeft: 16 }}>
            / {dish ? dish.category : "ETHIOPIAN FOOD"}
          </span>
        </div>

        <div
          style={{
            fontSize: dish && dish.name.length > 20 ? 58 : 76,
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 24,
            maxWidth: "1000px",
          }}
        >
          {dish ? dish.name : "Fresh flavors. Every day."}
        </div>

        {dish ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 40,
                fontWeight: 700,
                color: "#fbbf24",
                marginBottom: 24,
              }}
            >
              ETB {dish.price}
            </div>

            <div
              style={{
                fontSize: 26,
                lineHeight: 1.4,
                color: "#cbd5e1",
                maxWidth: "1000px",
              }}
            >
              {dish.description || "Discover delicious flavors at Addis Eats."}
            </div>
          </>
        ) : (
          <div
            style={{
              fontSize: 30,
              color: "#cbd5e1",
            }}
          >
            Discover your next favorite meal.
          </div>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 38,
            right: 76,
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          Delicious food, delivered.
        </div>
      </div>
    ),
    size
  );
}