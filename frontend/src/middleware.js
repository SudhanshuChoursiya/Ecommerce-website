import { NextResponse } from "next/server";
export function middleware(request) {
  //for signup and login page
  const authToken = request.cookies.get("token")?.value;

  const loginUserNotAccesablePath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  const notloginUserNotAccesablePath =
    request.nextUrl.pathname === "/profile" ||
    request.nextUrl.pathname.startsWith("/review-product");

  if (notloginUserNotAccesablePath) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (loginUserNotAccesablePath) {
    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //for reset-password page
  const resetToken = request.cookies.get("reset")?.value;
  if (request.nextUrl.pathname.startsWith("/reset-password")) {
    if (!resetToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/profile",
    "/reset-password/:path*",
    "/review-product/:path*",
  ],
};
