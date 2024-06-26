import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "./lib/session";
import Swal from "sweetalert2";

export default function middleware(request: NextRequest) {
  const pathSegments = request.url.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  if (lastSegment === "tables") {
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
}
