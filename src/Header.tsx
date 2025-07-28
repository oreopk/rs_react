import { NavLink } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <header>
      <nav>
        <NavLink className="nav-link" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </nav>
    </header>
  );
}
export default Header;
