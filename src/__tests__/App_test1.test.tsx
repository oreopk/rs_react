import { screen, render } from "@testing-library/react";
import App from "../App";

describe("App tests render", () => {
  test("should render the title", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("Star Wars Planets");
    expect(screen.getByTestId("app")).toBeInTheDocument();
  });
});
