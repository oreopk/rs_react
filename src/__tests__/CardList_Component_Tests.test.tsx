import { describe, test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Planet Cards Rendering", () => {
  test("render 1 planet cards", async () => {
    const user = userEvent.setup();
    render(<App />);

    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "Alderaan");
    const buttonElement = screen.getByRole("button", { name: /Search/ });
    expect(inputElement).toHaveValue("Alderaan");
    await user.click(buttonElement);

    await waitFor(
      () => {
        const cards = screen.getAllByRole("article");
        expect(cards).toHaveLength(1);
      },
      { timeout: 2500 },
    );
  });
});
