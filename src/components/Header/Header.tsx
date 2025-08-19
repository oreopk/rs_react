"use client";
import { useLocale, useTranslations } from "next-intl";
import "./Header.css";
import { ThemeContext } from "../../app/[locale]/providers/ThemeContext";
import { useContext } from "react";
import ErrorButton from "../Button/ErrorButton";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
function Header() {
  const [error, setError] = useState(false);
  const { toggleTheme } = useContext(ThemeContext) || {};
  const t = useTranslations("Header");
  const locale = useLocale();
  if (error) {
    throw new Error("Error");
  }
  return (
    <header className="light">
      <nav>
        <Link href={{ pathname: "/" }} locale={locale} className="nav-link">
          {t("home")}
        </Link>
        <Link
          href={{ pathname: "/about" }}
          locale={locale}
          className="nav-link"
        >
          {t("about")}
        </Link>
      </nav>
      <button className="switch_theme_button" onClick={toggleTheme}>
        Switch theme
      </button>
      <ErrorButton
        onClick={() => {
          setError(true);
        }}
      />
    </header>
  );
}
export default Header;
