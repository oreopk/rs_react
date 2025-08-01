export interface PlanetProperties {
  name?: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  population: string;
  climate: string;
  terrain: string;
  gravity: string;
}

export interface Planet {
  uid?: string;
  name?: string;
  properties: PlanetProperties;
}

export interface PlanetsListItem {
  uid: string;
  name: string;
  url: string;
}
