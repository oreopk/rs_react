import { screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import About from "../About";

describe("App tests render", () => {
  test("should render about", () => {
    render(
      <Provider store={store}>
        <Router>
          <About />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole("paragraph")).toHaveTextContent(
      "The author of the application is Pavel Kozin",
    );
    expect(screen.getByText("RS School")).toBeInTheDocument();
  });
});
