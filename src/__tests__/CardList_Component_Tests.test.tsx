import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainPage from "../MainPage";
import { PlanetApi } from "../PlanetFetch";
import { BrowserRouter as Router } from "react-router-dom";

vi.mock("../PlanetFetch", () => ({
  PlanetApi: {
    fetchPlanets: vi.fn(),
  },
}));

interface Planet {
  uid?: string;
  name: string;
  properties: PlanetProperties;
}

interface PlanetProperties {
  name?: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  population: string;
  climate: string;
  terrain: string;
}

interface fetchData {
  planets: Planet[];
  count: number;
}

const mockPlanet: fetchData = {
  planets: [
    {
      name: "Tatooine",
      properties: {
        name: "Tatooine",
        diameter: "10465",
        rotation_period: "23",
        orbital_period: "304",
        population: "200000",
        climate: "arid",
        terrain: "desert",
      },
    },
  ],
  count: 1,
};

describe("Planet Cards Rendering", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render 1 planet cards", async () => {
    const user = userEvent.setup();
    vi.mocked(PlanetApi.fetchPlanets).mockResolvedValue(mockPlanet);
    render(
      <Router>
        <MainPage />
      </Router>,
    );

    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "Tatooine");
    const buttonElement = screen.getByRole("button", { name: /Search/ });
    expect(inputElement).toHaveValue("Tatooine");
    await user.click(buttonElement);

    const cards = await screen.findAllByRole("article");
    expect(cards).toHaveLength(1);
    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByText(mockPlanet.planets[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(mockPlanet.planets[0].properties.diameter),
    ).toBeInTheDocument();
  });

  test("should render all planet cards", async () => {
    vi.mocked(PlanetApi.fetchPlanets).mockResolvedValue(mockPlanet);
    render(
      <Router>
        <MainPage />
      </Router>,
    );
    expect(await screen.findByRole("article")).toBeInTheDocument();
    expect(screen.getByText(mockPlanet.planets[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(mockPlanet.planets[0].properties.diameter),
    ).toBeInTheDocument();
  });
  test("should handle fetch errors", async () => {
    vi.mocked(PlanetApi.fetchPlanets).mockRejectedValueOnce(
      new Error("Error in request"),
    );
    render(
      <Router>
        <MainPage />
      </Router>,
    );

    const error = await screen.findByTestId("error-message");
    expect(error).toBeInTheDocument();
  });
});
