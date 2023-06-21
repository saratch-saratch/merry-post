import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./utils/token";
import { getErrorResponse } from "./utils/helpers";

interface AuthRequest extends NextRequest {
  user: {
    id: string;
  };
}

let redirectToLogin = false;
export async function middleware(request: NextRequest) {
  let token: string | undefined;

  if (request.cookies.has("token")) {
    token = request.cookies.get("token")?.value;
  } else if (request.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = request.headers.get("Authorization")?.substring(7);
  }

  if (
    request.nextUrl.pathname.startsWith("/login") &&
    (!token || redirectToLogin)
  )
    return;

  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/api/users") ||
      request.nextUrl.pathname.startsWith("/api/auth/logout"))
  ) {
    return getErrorResponse(401, "You are not logged in.");
  }

  const response = NextResponse.next();

  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      response.headers.set("X-USER-ID", sub);
      (request as AuthRequest).user = { id: sub };
    }
  } catch (error) {
    redirectToLogin = true;
    if (request.nextUrl.pathname.startsWith("/api")) {
      return getErrorResponse(401, "Token is invalid");
    }

    return NextResponse.redirect(
      new URL(
        `/login?${new URLSearchParams({ error: "badauth" })}`,
        request.url
      )
    );
  }

  const authUser = (request as AuthRequest).user;

  if (!authUser) {
    return NextResponse.redirect(
      new URL(
        `/login?${new URLSearchParams({
          error: "badauth",
          forceLogin: "true",
        })}`,
        request.url
      )
    );
  }

  // if (request.url.includes("/login") && authUser) {
  //   return NextResponse.redirect(new URL("/home", request.url));
  // }

  return response;
}

export const config = {
  matcher: ["/home", "/login", "/api/users/:path*", "/api/auth/logout"],
};
