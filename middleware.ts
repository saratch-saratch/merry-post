export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home",
    "/home/:path*",
    "/api/posts",
    "/api/posts/:path*",
    "/api/comments",
    "/api/comments/:path*",
    "/api/user",
    "/api/user/:path*",
  ],
};
