interface Planet {
  uid?: string;
  name?: string;
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

interface PlanetsListItem {
  uid: string;
  name: string;
  url: string;
}

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

interface PlanetsCountResponse {
  total_records: number;
}

async function fetchData<T>(searchQuery: string): Promise<T> {
  const response = await fetch(searchQuery);
  if (!response.ok) {
    throw new Error("Error in request");
  }
  return response.json();
}

const ArrayToPlanet = (data: {
  uid: string;
  properties: PlanetProperties;
}): Planet => {
  return {
    uid: data.uid,
    name: data.properties.name,
    properties: {
      name: data.properties.name,
      diameter: data.properties.diameter,
      rotation_period: data.properties.rotation_period,
      orbital_period: data.properties.orbital_period,
      population: data.properties.population,
      climate: data.properties.climate,
      terrain: data.properties.terrain,
    },
  };
};

export const PlanetApi = {
  async fetchPlanets(searchQuery: string = "", currentPage: number = 1) {
    let url: string;
    let planets: Planet[] = [];
    let count;
    if (searchQuery) {
      url =
        "https://swapi.tech/api/planets" +
        "?name=" +
        encodeURIComponent(searchQuery.trim());
      const listData = await fetchData<PlanetDetailsResponseSearch>(url);
      planets = listData.result.map((planet) => ArrayToPlanet(planet));
      count = planets.length;
    } else {
      const Data = await fetchData<PlanetsCountResponse>(
        `https://swapi.tech/api/planets?page=NaN&limit=NaN`,
      );
      count = Data.total_records;
      const listData = await fetchData<PlanetsListResponse>(
        `https://swapi.tech/api/planets?page=${currentPage}&limit=10`,
      );
      const planetsDetails = await Promise.all(
        listData.results.map((item) =>
          fetchData<PlanetDetailsResponse>(item.url),
        ),
      );
      planets = planetsDetails.map((detail) => ArrayToPlanet(detail.result));
    }
    return { planets, count };
  },
};
