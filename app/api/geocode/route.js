
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address")?.trim();

  if (!address || address.length < 3) {
    return NextResponse.json(
      { error: "Enter a valid delivery address." },
      { status: 400 }
    );
  }

  if (address.length > 200) {
    return NextResponse.json(
      { error: "Address is too long." },
      { status: 400 }
    );
  }

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", address);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");
    url.searchParams.set("countrycodes", "et");

    const response = await fetch(url, {
      headers: {
        "User-Agent": "AddisEats/1.0 (delivery location search)",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Address search is temporarily unavailable." },
        { status: 502 }
      );
    }

    const results = await response.json();
    const match = results[0];

    if (!match) {
      return NextResponse.json(
        { error: "Address not found. Try adding your area or nearby landmark." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      latitude: Number(match.lat),
      longitude: Number(match.lon),
      displayName: match.display_name,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to search this address right now. Please try again." },
      { status: 502 }
    );
  }
}
