import { NavLink } from "react-router-dom";

function Page404() {
  return (
    <div>
      <h1>404</h1>
      <NavLink to="/">Вернуться на главную</NavLink>
    </div>
  );
}

export default Page404;
