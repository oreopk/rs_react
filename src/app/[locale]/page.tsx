import { redirect } from "@/i18n/navigation";

export default function Page() {
  redirect({
    href: {
      pathname: "/list/[pageNumber]",
      params: { pageNumber: "1" },
    },
    locale: "en",
  });
}
