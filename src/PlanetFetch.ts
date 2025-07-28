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

async function fetchData<Planets>(searchQuery: string): Promise<Planets> {
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
  async fetchPlanets(searchQuery: string = "") {
    const apiUrl: string = "https://swapi.tech/api/planets";
    let url: string;
    let planets: Planet[] = [];
    if (searchQuery) {
      url = apiUrl + "?name=" + encodeURIComponent(searchQuery.trim());
      const listData = await fetchData<PlanetDetailsResponseSearch>(url);
      planets = listData.result.map((planet) => ArrayToPlanet(planet));
    } else {
      const listData = await fetchData<PlanetsListResponse>(apiUrl);
      const planetsDetails = await Promise.all(
        listData.results.map((item) =>
          fetchData<PlanetDetailsResponse>(item.url),
        ),
      );
      planets = planetsDetails.map((detail) => ArrayToPlanet(detail.result));
    }
    return planets;
  },
};
