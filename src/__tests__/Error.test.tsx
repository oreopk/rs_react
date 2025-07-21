import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import ErrorBoundary from "../ErrorBoundary";
import { describe, it, expect, vi } from "vitest";

describe("Error component", () => {
  it("should throw error", () => {
    const ErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>,
    );

    const errorButton = screen.getByRole("button", { name: /Error/ });
    fireEvent.click(errorButton);

    expect(screen.getByText(/Test error/)).toBeInTheDocument();
    expect(ErrorSpy).toHaveBeenCalled();

    const errorCalls = ErrorSpy.mock.calls;
    expect(errorCalls[0][1].toString()).toContain("Error: Test error");
    ErrorSpy.mockRestore();
  });
});
