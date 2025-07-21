import { render, screen } from "@testing-library/react";
import App from "../App";
import ErrorBoundary from "../ErrorBoundary";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Error component", () => {
  it("should throw error", async () => {
    const ErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>,
    );

    const errorButton = screen.getByRole("button", { name: /Error/ });
    await userEvent.click(errorButton);

    expect(screen.getByText(/Test error/)).toBeInTheDocument();
    expect(ErrorSpy).toHaveBeenCalled();

    const errorCalls = ErrorSpy.mock.calls;
    expect(errorCalls[0][1].toString()).toContain("Error: Test error");
    ErrorSpy.mockRestore();
  });
});
