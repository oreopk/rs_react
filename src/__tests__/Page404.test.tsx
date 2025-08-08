import { screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Page404 from "../Page404";

describe("App tests render", () => {
  test("should render about", () => {
    render(
      <Provider store={store}>
        <Router>
          <Page404 />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("404");
    expect(screen.getByRole("link", { name: /Вернуться на главную/ }));
  });
});
