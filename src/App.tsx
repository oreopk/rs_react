import React from "react";
import "./App.css";
import ErrorButton from "./ErrorButton";
import Button from "./Button";
import Input from "./Input";
import PlanetCard from "./PlanetCard";
import Spinner from "./Spinner";

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
  isLoading: boolean;
  error: string | null;
  throwBoolean: boolean;
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
      isLoading: false,
      error: null,
      throwBoolean: false,
    };
  }

  resetErrorState = () => {
    this.setState({ throwBoolean: false });
  };

  triggerError = () => {
    this.setState({ throwBoolean: true });
  };

  fetchPlanets = async (searchQuery: string = "") => {
    this.setState({ isLoading: true, error: null });
    let url: string;
    let planets: Planet[] = [];
    if (searchQuery) {
      url = this.apiUrl + "?name=" + encodeURIComponent(searchQuery);
      const listResponse = await fetch(url);
      if (!listResponse.ok) {
        throw new Error("Error in request");
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

      for (const planet of listData.results) {
        const detailsResponse = await fetch(planet.url);
        if (!detailsResponse.ok) {
          throw new Error(`Failed`);
        }

        const detailsData: PlanetDetailsResponse = await detailsResponse.json();
        planets.push({
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
        });
      }
    }
    this.setState({ searchResults: planets, isLoading: false });
  };

  handleSearch = () => {
    localStorage.setItem(this.localStorageKey, this.state.inputValue);
    this.fetchPlanets(this.state.inputValue);
  };

  componentDidMount() {
    this.setState({
      inputValue: localStorage.getItem(this.localStorageKey) || "",
    });
    this.fetchPlanets(this.state.inputValue);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { inputValue, searchResults, isLoading, throwBoolean } = this.state;

    if (throwBoolean) {
      throw new Error("Test error");
    }

    return (
      <div className="app-container">
        <h1 className="title">Star Wars Planets</h1>

        <div className="search-container">
          <Input value={inputValue} onChange={this.handleInputChange} />
          <Button onClick={this.handleSearch}>{"Search"}</Button>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="results-container">
            {inputValue.trim() !== "" && searchResults.length === 0 ? (
              <div className="nothing">Nothing</div>
            ) : (
              <div className="results-grid">
                {searchResults.map((planet: Planet) => (
                  <PlanetCard key={planet.uid} planet={planet} />
                ))}
              </div>
            )}
          </div>
        )}
        <ErrorButton onClick={this.triggerError} />
      </div>
    );
  }
}

export default App;
