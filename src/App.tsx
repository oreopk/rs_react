import React from "react";
import "./App.css";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

interface PlanetProperties {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  population: string;
  climate: string;
  terrain: string;
}
interface PlanetUrl {
  url: string;
  name: string;
}

interface Planet {
  uid: string;
  name: string;
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

class App extends React.Component<object, AppState> {
  apiUrl: string = "https://swapi.tech/api/planets";

  constructor(props: object) {
    super(props);
    this.state = {
      inputValue: "",
      searchResults: [],
    };
  }

  fetchPlanets = async (searchQuery: string = "") => {
    let url: string;
    if (searchQuery) {
      url = this.apiUrl + "?search=" + encodeURIComponent(searchQuery);
    } else {
      url = this.apiUrl;
    }

    const listResponse = await fetch(url);

    const listData: PlanetsListResponse = await listResponse.json();
    const planets = await Promise.all(
      listData.results.map(async (planet: PlanetUrl) => {
        const detailsResponse = await fetch(planet.url);
        if (!detailsResponse.ok) {
          throw new Error(`Failed`);
        }
        const detailsData: PlanetDetailsResponse = await detailsResponse.json();
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

    this.setState({ searchResults: planets });
  };

  handleSearch = () => {
    this.fetchPlanets(this.state.inputValue);
  };

  componentDidMount() {
    this.fetchPlanets();
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { inputValue, searchResults } = this.state;

    return (
      <div className="app-container">
        <h1>Star Wars Planets</h1>

        <div className="search-container">
          <Input value={inputValue} onChange={this.handleInputChange} />
          <Button onClick={this.handleSearch}>{"Search"}</Button>
        </div>

        <div className="results-container">
          {searchResults.length != 0 ? (
            <div className="no-results">Nothing</div>
          ) : (
            <ul className="results-list">
              {searchResults.map((planet: Planet) => (
                <li key={planet.uid}>
                  <h3>{planet.name}</h3>
                  <p>Diameter: {planet.properties.diameter}</p>
                  <p>Climate: {planet.properties.climate}</p>
                  <p>Terrain: {planet.properties.terrain}</p>
                  <p>Population: {planet.properties.population}</p>
                  <p>Rotation Period: {planet.properties.rotation_period}</p>
                  <p>Orbital Period: {planet.properties.orbital_period}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
