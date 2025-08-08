import { screen, render } from "@testing-library/react";
import MainPage from "../MainPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Wrapper from "../Wrapper";

describe("App tests render", () => {
  test("should render the title", () => {
    render(
      <Provider store={store}>
        <Router>
          <MainPage />
          <Wrapper />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("Star Wars Planets");
    expect(screen.getByTestId("app")).toBeInTheDocument();
  });
});
