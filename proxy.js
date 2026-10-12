import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.SESSION_SECRET;
const secretKey = secret
  ? new TextEncoder().encode(secret)
  : null;

async function getSessionFromRequest(request) {
  const token = request.cookies.get("session")?.value;

  if (!token || !secretKey) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);

    return {
      id: payload.id,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const session = await getSessionFromRequest(request);

  if (!session) {
    const url = new URL("/signin", request.url);

    url.searchParams.set("next", pathname);

    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/kitchen") && session.role !== "staff") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/orders/:path*",
    "/kitchen/:path*",
  ],
};