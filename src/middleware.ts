import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const pathSegments = request.url.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  if (lastSegment !== "tables") {
    const token = cookies().get('auth')?.value;
    if (token) {
      const decoded = jwtDecode(token).exp !;
      if (decoded > Date.now() / 1000) {
        return NextResponse.next();
      } else {
        cookies().delete('auth');
      }
    }
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}
