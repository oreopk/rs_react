import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
  locales: ["en", "ru"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/about": "/about",
    "/list/[pageNumber]": {
      en: "/list/[pageNumber]",
    },
    "/list/[pageNumber]/[planetId]": {
      en: "/list/[pageNumber]/[planetId]",
    },
  },
});
