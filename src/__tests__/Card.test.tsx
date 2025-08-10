import { describe, test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import PlanetCard from "../PlanetCard";
import { PlanetApi } from "../PlanetFetch";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import type { Params } from "react-router-dom";

vi.mock("../PlanetFetch", () => ({
  PlanetApi: {
    fetchPlanetDetail: vi.fn(),
  },
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...original,
    useParams: (): Readonly<Params<string>> => ({ planetId: "2" }),
  };
});

describe("Planet Cards Rendering", () => {
  test("should render 1 planet cards", async () => {
    const mockPlanetData = {
      name: "Alderaan",
      diameter: "12500",
      climate: "temperate",
      population: "2000000000",
      rotation_period: "24",
      orbital_period: "364",
      gravity: "1 standard",
      terrain: "grasslands, mountains",
      url: "https://www.swapi.tech/api/planets/2",
    };

    vi.mocked(PlanetApi.fetchPlanetDetail).mockResolvedValue(mockPlanetData);
    render(
      <Provider store={store}>
        <Router>
          <PlanetCard />
        </Router>
      </Provider>,
    );
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Alderaan/ }),
      ).toBeInTheDocument();
    });
  });
});
