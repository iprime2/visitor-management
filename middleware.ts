import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/admin"];

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_JWT_SECRET,
    });
    if (!token) {
      const url = new URL(`/`, req.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
