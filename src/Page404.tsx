import { NavLink } from "react-router-dom";

export function Page404() {
  return (
    <div>
      <h1>404</h1>
      <NavLink to="/">Вернуться на главную</NavLink>
    </div>
  );
}
