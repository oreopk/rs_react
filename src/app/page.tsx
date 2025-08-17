import { redirect } from "@/i18n/navigation";

export default async function Page() {
  redirect({
    href: {
      pathname: "/list/[pageNumber]",
      params: { pageNumber: "1" },
    },
    locale: "ru",
  });
}
