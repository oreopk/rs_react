import { NavLink } from "react-router-dom";
import "./Header.css";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";
import ErrorButton from "../ErrorButton";

interface HeaderProps {
  handleError: () => void;
}

function Header({ handleError }: HeaderProps) {
  const { theme, toggleTheme } = useContext(ThemeContext) || {};
  return (
    <header className={`${theme}`}>
      <nav>
        <NavLink className="nav-link" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </nav>
      <button className="switch_theme_button" onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
      <ErrorButton onClick={handleError} />
    </header>
  );
}
export default Header;
