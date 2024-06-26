import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const pathSegments = request.url.split("/");
  console.log(request.nextUrl.pathname);
  const lastSegment = pathSegments[pathSegments.length - 1];
  if (
    lastSegment === "tables" ||
    lastSegment === "calendar" ||
    lastSegment === "profile" ||
    lastSegment === "settings" ||
    lastSegment === "form-layout" ||
    lastSegment === "form-elements" ||
    request.nextUrl.href === `${request.nextUrl.origin}/`
  ) {
    const token = cookies().get("auth")?.value;
    console.log(token);
    if (token) {
      const decoded = jwtDecode(token).exp!;
      console.log(decoded);

      if (decoded > Date.now() / 1000) {
        return NextResponse.next();
      }
    }
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  return NextResponse.next();

}
