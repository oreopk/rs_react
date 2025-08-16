"use client";

import "./Header.css";
// import { ThemeContext } from "../../ThemeContext";
// import { useContext } from "react";
// import ErrorButton from "../../ErrorButton";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// function Header({ handleError }: { handleError: () => void }) {
function Header() {
  // const { theme, toggleTheme } = useContext(ThemeContext) || {};
  const t = useTranslations("Header");
  return (
    <header className="light">
      <nav>
        <Link href="/" className="nav-link">
          {t("home")}
        </Link>
        <Link href="/about" className="nav-link">
          {t("about")}
        </Link>
      </nav>
      {/* <button className="switch_theme_button" onClick={toggleTheme}>
        Switch theme
      </button> */}
      {/* <ErrorButton onClick={handleError} /> */}
    </header>
  );
}
export default Header;
