import type { PlanetProperties, PlanetsListItem } from "./types";

interface PlanetsListResponse {
  results: PlanetsListItem[];
}

interface PlanetDetailsResponse {
  result: {
    properties: PlanetProperties;
    uid: string;
  };
}

interface PlanetDetailsResponseSearch {
  result: [];
}

async function fetchData<T>(searchQuery: string): Promise<T> {
  const response = await fetch(searchQuery);
  if (!response.ok) {
    throw new Error("Error in request");
  }
  return response.json();
}
const ArrayToPlanet1 = (data: {
  uid: string;
  name: string;
  url: string;
}): PlanetsListItem => {
  return {
    uid: data.uid,
    name: data.name,
    url: data.url,
  };
};

const ArrayToPlanet2 = (data: {
  properties: {
    uid: string;
    name: string;
    url: string;
  };
}): PlanetsListItem => {
  console.log(data.properties);
  return {
    uid: data.properties.uid,
    name: data.properties.name,
    url: data.properties.url,
  };
};

const ToPlanet = (data: { properties: PlanetProperties }): PlanetProperties => {
  return {
    name: data.properties.name,
    diameter: data.properties.diameter,
    rotation_period: data.properties.rotation_period,
    orbital_period: data.properties.orbital_period,
    population: data.properties.population,
    climate: data.properties.climate,
    terrain: data.properties.terrain,
    gravity: data.properties.gravity,
  };
};

export const PlanetApi = {
  fetchPlanets: async function (
    searchQuery: string = "",
    currentPage: number = 1,
  ) {
    let url: string;
    let planets = [];
    let count;
    if (searchQuery) {
      url =
        "https://swapi.tech/api/planets" +
        "?name=" +
        encodeURIComponent(searchQuery.trim());
      const listData = await fetchData<PlanetDetailsResponseSearch>(url);
      planets = listData.result.map((planet) => ArrayToPlanet2(planet));
      count = planets.length;
    } else {
      const listData = await fetchData<PlanetsListResponse>(
        `https://swapi.tech/api/planets?page=${currentPage}&limit=NaN`,
      );
      planets = listData.results.map((detail) => ArrayToPlanet1(detail));
      count = planets.length;
    }
    return { planets, count };
  },

  fetchPlanetDetail: async function (planet_url: string = "") {
    const planetDetails = await fetchData<PlanetDetailsResponse>(planet_url);
    return ToPlanet(planetDetails.result);
  },
};
