import React, { useState, useEffect } from "react";
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

function App(): React.ReactElement {
  const localStorageKey: string = "starWarsQuery";

  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem(localStorageKey) || "",
  );
  const [searchResults, setSearchResults] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorBoolean, setErrorBoolean] = useState<boolean>(false);

  function triggerError() {
    setErrorBoolean(true);
  }

  const fetchPlanets = async (searchQuery: string = "") => {
    let errorMessage = "Unknown error";
    setIsLoading(true);
    setError(null);
    try {
      const planets = await PlanetApi.fetchPlanets(searchQuery);
      setSearchResults(planets);
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  function handleSearch() {
    localStorage.setItem(localStorageKey, inputValue.trim());
    fetchPlanets(inputValue);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    setInputValue(localStorage.getItem(localStorageKey) || "");
    fetchPlanets(inputValue);
  }, []);

  if (errorBoolean) {
    throw new Error("Test error");
  }

  return (
    <div className="app-container" data-testid="app">
      <h1 className="title">Star Wars Planets</h1>
      {error ? <div data-testid="error-message">{error}</div> : null}
      <div className="search-container">
        <Input value={inputValue} onChange={handleInputChange} />
        <Button onClick={handleSearch}>{"Search"}</Button>
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
      <ErrorButton onClick={triggerError} />
    </div>
  );
}

export default App;
