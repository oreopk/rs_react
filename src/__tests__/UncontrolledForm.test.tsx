import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import UncontrolledForm from "../UncontrolledForm";
import { store } from "../store";

describe("UncontrolledForm (single-file helper)", () => {
  it("shouled error non empty when submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <Provider store={store}>
        <UncontrolledForm onSubmit={onSubmit} />
      </Provider>,
    );

    await user.click(screen.getByRole("button", { name: /Submit/i }));
    expect(onSubmit).not.toHaveBeenCalled();

    const errors = Array.from(document.querySelectorAll("p.error"))
      .map((element) => element.textContent)
      .filter(Boolean);

    expect(errors.length).toBeGreaterThan(0);
  });

  it("should good submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Provider store={store}>
        <UncontrolledForm onSubmit={onSubmit} />
      </Provider>,
    );
    await user.type(screen.getByLabelText(/name/i), "Pavel");
    await user.type(screen.getByLabelText(/age/i), "25");
    await user.type(screen.getByLabelText(/email/i), "example@example.com");
    await user.type(screen.getByLabelText("Password*"), "Qwerty9#");
    await user.type(screen.getByLabelText("Confirm Password*"), "Qwerty9#");
    await user.click(screen.getByRole("radio", { name: "Male" }));
    await user.type(screen.getByLabelText(/country/i), "Russia");
    await user.click(screen.getByRole("checkbox", { name: /terms/i }));
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Pavel",
        age: 25,
        email: "example@example.com",
        password1: "Qwerty9#",
        password2: "Qwerty9#",
        gender: "male",
        country: "Russia",
        terms: true,
      }),
    );
  });

  it("should reset delete errors", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <UncontrolledForm onSubmit={() => {}} />
      </Provider>,
    );

    await user.click(screen.getByRole("button", { name: /submit/i }));

    const errors = Array.from(document.querySelectorAll("p.error"))
      .map((element) => element.textContent)
      .filter(Boolean);

    expect(errors.length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: /reset/i }));

    const after_errors = Array.from(document.querySelectorAll("p.error"))
      .map((element) => element.textContent)
      .filter(Boolean);

    expect(after_errors.length).toBe(0);
  });
});
