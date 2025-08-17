// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { locales } = routing;

  if (locales.some((l) => pathname === `/${l}`)) {
    const url = req.nextUrl.clone();
    url.pathname = `${pathname}/list/1`;
    return NextResponse.redirect(url);
  }

  return intl(req);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
