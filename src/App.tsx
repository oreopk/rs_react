import React from "react";
import "./App.css";
import ErrorButton from "./ErrorButton";
import Button from "./Button";
import Input from "./Input";
import PlanetCard from "./PlanetCard";
import Spinner from "./Spinner";
import { PlanetApi } from "./PlanetFetch";
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

interface AppState {
  inputValue: string;
  searchResults: Planet[];
  isLoading: boolean;
  error: string | null;
  throwBoolean: boolean;
}

class App extends React.Component<object, AppState> {
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
    let errorMessage = "Unknown error";
    this.setState({ isLoading: true, error: null });
    try {
      const planets = await PlanetApi.fetchPlanets(searchQuery);
      this.setState({ searchResults: planets, isLoading: false });
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      this.setState({ error: errorMessage, isLoading: false });
    }
  };

  handleSearch = () => {
    localStorage.setItem(this.localStorageKey, this.state.inputValue.trim());
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
      <div className="app-container" data-testid="app">
        <h1 className="title">Star Wars Planets</h1>
        {this.state.error ? (
          <div data-testid="error-message">{this.state.error}</div>
        ) : null}
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
