import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MainPage from "../MainPage";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";

describe("Search Component Tests", () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };

  beforeEach(() => {
    vi.stubGlobal("localStorage", localStorageMock);
  });

  test("should render Input and Button elements", () => {
    render(
      <Provider store={store}>
        <Router>
          <MainPage />
        </Router>
      </Provider>,
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeVisible();
    expect(inputElement).toBeInTheDocument();
    const buttonElement = screen.getByRole("button", { name: /Search/ });
    expect(buttonElement).toBeInTheDocument();
  });

  test("test text from localstorage", () => {
    const testQuery = "Tatooine";
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === "starWarsQuery") {
        return testQuery;
      } else {
        return null;
      }
    });
    render(
      <Provider store={store}>
        <Router>
          <MainPage />
        </Router>
      </Provider>,
    );
    expect(screen.getByRole("textbox")).toHaveValue(testQuery);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("starWarsQuery");
  });

  test("shows empty input", () => {
    localStorageMock.getItem.mockImplementation(() => {
      return null;
    });
    render(
      <Provider store={store}>
        <Router>
          <MainPage />
        </Router>
        ,
      </Provider>,
    );
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(localStorageMock.getItem).toHaveBeenCalledWith("starWarsQuery");
  });

  test("should update input value when typing", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Router>
          <MainPage />
        </Router>
        ,
      </Provider>,
    );

    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "Alderaan");

    expect(inputElement).toHaveValue("Alderaan");
  });

  test("save to localStorage", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Router>
          <MainPage />
        </Router>
        ,
      </Provider>,
    );

    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button", { name: /Search/ });

    await user.type(inputElement, "Coruscant");
    await user.click(buttonElement);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "starWarsQuery",
      "Coruscant",
    );
  });

  test("should trim whitespace", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Router>
          <MainPage />
        </Router>
        ,
      </Provider>,
    );

    const inputElement = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button", { name: /Search/ });

    await user.type(inputElement, "  Tatooine  ");
    await user.click(searchButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "starWarsQuery",
      "Tatooine",
    );
  });
});
