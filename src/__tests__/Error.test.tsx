import { render, screen } from "@testing-library/react";
import MainPage from "../MainPage";
import ErrorBoundary from "../ErrorBoundary";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";

describe("Error component", () => {
  it("should throw error", async () => {
    const ErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <Provider store={store}>
        <ErrorBoundary>
          <Router>
            <MainPage />
          </Router>
        </ErrorBoundary>
      </Provider>,
    );

    const errorButton = screen.getByRole("button", { name: /Error/ });
    await userEvent.click(errorButton);

    expect(screen.getByText(/Test error/)).toBeInTheDocument();
    expect(ErrorSpy).toHaveBeenCalled();

    const errorCalls = ErrorSpy.mock.calls;
    expect(errorCalls[0][1].toString()).toContain("Error: Test error");
    ErrorSpy.mockRestore();
  });

  it("should click reboot button", async () => {
    render(
      <Provider store={store}>
        <ErrorBoundary>
          <Router>
            <MainPage />
          </Router>
        </ErrorBoundary>
      </Provider>,
    );

    const errorButton = screen.getByRole("button", { name: /Error/ });
    await userEvent.click(errorButton);

    const rebootButton = screen.getByRole("button", { name: /Reboot/ });
    await userEvent.click(rebootButton);

    expect(screen.queryByText(/Test error/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Error/ })).toBeInTheDocument();
  });
});
