import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";

function Wrapper() {
  const { theme } = useContext(ThemeContext) || {};
  const [errorBoolean, setErrorBoolean] = useState<boolean>(false);

  function triggerError() {
    setErrorBoolean(true);
  }
  if (errorBoolean) {
    throw new Error("Test error");
  }

  return (
    <div className={`app-container ${theme}`} data-testid="app">
      <Header handleError={triggerError} />
      <Outlet />
    </div>
  );
}

export default Wrapper;
