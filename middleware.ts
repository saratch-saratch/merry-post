import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./utils/token";
import { getErrorResponse } from "./utils/helpers";

interface AuthRequest extends NextRequest {
  user: {
    id: string;
  };
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname.startsWith("/login") && !token) return;

  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/api/users") ||
      request.nextUrl.pathname.startsWith("/api/auth/logout"))
  ) {
    return getErrorResponse(401, "Token is missing");
  }

  const response = NextResponse.next();

  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      response.headers.set("X-USER-ID", sub);
      (request as AuthRequest).user = { id: sub };
    }
  } catch (error) {
    if (request.nextUrl.pathname.startsWith("/api")) {
      return getErrorResponse(401, "Token is invalid");
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  const authUser = (request as AuthRequest).user;

  if (!authUser) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.url.includes("/login") && authUser) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/home",
    "/home/:path*",
    "/login",
    "/api/users/:path*",
    "/api/auth/logout",
  ],
};
