import { describe, expect, beforeEach, afterEach, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/vitest";
import { store } from "../store/";

import App from "../App";

function renderApp() {
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

let portalRoot: HTMLDivElement;

beforeEach(() => {
  portalRoot = document.createElement("div");
  portalRoot.id = "portal-root";
  document.body.appendChild(portalRoot);
});

afterEach(() => {
  portalRoot.remove();
});

describe("App portal", () => {
  test("should Uncontrolled Form", async () => {
    renderApp();

    await userEvent.click(
      screen.getByRole("button", { name: "Uncontrolled Form" }),
    );

    expect(
      screen.getByRole("heading", { name: "Uncontrolled Form" }),
    ).toBeInTheDocument();
  });

  test("should Сontrolled Form", async () => {
    renderApp();

    await userEvent.click(
      screen.getByRole("button", { name: "Controlled Form" }),
    );

    expect(
      screen.getByRole("heading", { name: "Controlled Form" }),
    ).toBeInTheDocument();
  });
});
