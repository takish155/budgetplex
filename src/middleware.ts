import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ja"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(en|ja)/:path*",
    "/dashboard/:path*",
    "/transaction/:path*",
    "/bills/:path*",
    "/salary/:path*",
    "/settings/:path*",
    "/(en|ja)/salary/:idk*",
  ],
};
