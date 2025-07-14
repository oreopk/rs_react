import React from "react";
import "./App.css";

interface PlanetUrl {
  url: string;
}

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
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

interface Planet {
  uid?: string;
  name?: string;
  properties: PlanetProperties;
}

interface PlanetsListItem {
  uid: string;
  name: string;
  url: string;
}

interface PlanetsListResponse {
  results: PlanetsListItem[];
}

interface AppState {
  inputValue: string;
  searchResults: Planet[];
}

class Button extends React.Component<ButtonProps> {
  render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>;
  }
}

class Input extends React.Component<InputProps> {
  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
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

interface PlanetDetailsResponseSearchSolo {
  uid: string;
  properties: PlanetProperties;
}

class App extends React.Component<object, AppState> {
  apiUrl: string = "https://swapi.tech/api/planets";
  localStorageKey: string = "starWarsQuery";

  constructor(props: object) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem(this.localStorageKey) || "",
      searchResults: [],
    };
  }

  fetchPlanets = async (searchQuery: string = "") => {
    let url: string;
    let planets: Planet[] = [];
    if (searchQuery) {
      url = this.apiUrl + "?name=" + encodeURIComponent(searchQuery);
      const listResponse = await fetch(url);
      if (!listResponse.ok) {
        throw new Error(`Failed`);
      }
      const listData: PlanetDetailsResponseSearch = await listResponse.json();
      if (listData.result) {
        console.log(listData.result);
      }
      planets = listData.result.map(
        (planet: PlanetDetailsResponseSearchSolo) => {
          return {
            uid: planet.uid,
            name: planet.properties.name,
            properties: {
              diameter: planet.properties.diameter,
              rotation_period: planet.properties.rotation_period,
              orbital_period: planet.properties.orbital_period,
              population: planet.properties.population,
              climate: planet.properties.climate,
              terrain: planet.properties.terrain,
            },
          };
        },
      );
    } else {
      url = this.apiUrl;
      const listResponse = await fetch(url);
      const listData: PlanetsListResponse = await listResponse.json();
      planets = await Promise.all(
        listData.results.map(async (planet: PlanetUrl) => {
          const detailsResponse = await fetch(planet.url);
          if (!detailsResponse.ok) {
            throw new Error(`Failed`);
          }

          const detailsData: PlanetDetailsResponse =
            await detailsResponse.json();
          return {
            uid: detailsData.result.uid,
            name: detailsData.result.properties.name,
            properties: {
              name: detailsData.result.properties.name,
              diameter: detailsData.result.properties.diameter,
              rotation_period: detailsData.result.properties.rotation_period,
              orbital_period: detailsData.result.properties.orbital_period,
              population: detailsData.result.properties.population,
              climate: detailsData.result.properties.climate,
              terrain: detailsData.result.properties.terrain,
            },
          };
        }),
      );
    }
    this.setState({ searchResults: planets });
  };

  handleSearch = () => {
    localStorage.setItem(this.localStorageKey, this.state.inputValue);
    this.fetchPlanets(this.state.inputValue);
  };

  componentDidMount() {
    this.fetchPlanets();
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
    if (!e.target.value) {
      localStorage.removeItem(this.localStorageKey);
    }
  };

  render() {
    const { inputValue, searchResults } = this.state;

    return (
      <div className="app-container">
        <h1 className="title">Star Wars Planets</h1>

        <div className="search-container">
          <Input value={inputValue} onChange={this.handleInputChange} />
          <Button onClick={this.handleSearch}>{"Search"}</Button>
        </div>

        <div className="results-container">
          {inputValue.trim() !== "" && searchResults.length === 0 ? (
            <div className="nothing">Nothing</div>
          ) : (
            <div className="results-grid">
              {searchResults.map((planet: Planet) => (
                <div key={planet.uid} className="planet-card">
                  <div className="planet-details">
                    <h3 className="planet-name">{planet.name}</h3>
                    <div className="detail-row">
                      <span className="detail-label">Diameter:</span>
                      <span className="prop_planet">
                        {planet.properties.diameter}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Climate:</span>
                      <span className="prop_planet">
                        {planet.properties.climate}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Terrain:</span>
                      <span className="prop_planet">
                        {planet.properties.terrain}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Population:</span>
                      <span className="prop_planet">
                        {planet.properties.population}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Rotation Period:</span>
                      <span className="prop_planet">
                        {planet.properties.rotation_period}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Orbital Period:</span>
                      <span className="prop_planet">
                        {planet.properties.orbital_period}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
