import { ThemeProvider } from "../[locale]/providers/ThemeProvider";
import Header from "../../components/Header/Header";
import ReduxProvider from "../[locale]/providers/ReduxProvider";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ReduxProvider>
        <Header />
        {children}
      </ReduxProvider>
    </ThemeProvider>
  );
}
