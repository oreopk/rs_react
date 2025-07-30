import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import ErrorButton from "./ErrorButton";
import Header from "./Header";
import { PlanetApi } from "./PlanetFetch";
import Planets from "./Planets";
import Button from "./Button";
import Input from "./Input";
import type { Planet } from "./types";
import Pagination from "./Pagination";
import useLocalStorage from "./hooks/useLocalStorage";

function MainPage(): React.ReactElement {
  const localStorageKey: string = "starWarsQuery";
  const [inputValue, setInputValue] = useLocalStorage(localStorageKey, "");
  const [searchPlanets, setPlanets] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPlanets, setTotalPlanets] = useState(0);
  const [planetsPerPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    if (page !== currentPage) {
      setCurrentPage(page);
    }
    setInputValue(localStorage.getItem(localStorageKey) || "");
    fetchPlanets(inputValue);
  }, [searchParams]);

  const fetchPlanets = async (searchQuery: string = "") => {
    let errorMessage = "Unknown error";
    setIsLoading(true);
    setError(null);
    try {
      const planets = await PlanetApi.fetchPlanets(searchQuery, currentPage);
      setTotalPlanets(planets.count);
      if (searchQuery) {
        const firstPlanetsIndex = (currentPage - 1) * planetsPerPage;
        const lastPlanetsIndex = firstPlanetsIndex + planetsPerPage;
        const currentPlanets = planets.planets.slice(
          firstPlanetsIndex,
          lastPlanetsIndex,
        );
        setPlanets(currentPlanets);
      } else {
        setPlanets(planets.planets);
      }
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

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber.toString() });
  };

  const [error, setError] = useState<string | null>(null);
  const [errorBoolean, setErrorBoolean] = useState<boolean>(false);

  function triggerError() {
    setErrorBoolean(true);
  }

  function handleSearch() {
    fetchPlanets(inputValue);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  if (errorBoolean) {
    throw new Error("Test error");
  }

  return (
    <div className="app-container" data-testid="app">
      <Header></Header>
      <h1 className="title">Star Wars Planets</h1>
      {error ? <div data-testid="error-message">{error}</div> : null}
      <div className="search-container">
        <Input value={inputValue} onChange={handleInputChange} />
        <Button onClick={handleSearch}>{"Search"}</Button>
      </div>
      <Planets
        searchPlanets={searchPlanets}
        isLoading={isLoading}
        inputValue={inputValue}
      />
      <Pagination
        planetsPerPage={planetsPerPage}
        totalPlanets={totalPlanets}
        paginate={paginate}
        currentPage={currentPage}
      ></Pagination>
      <ErrorButton onClick={triggerError} />
    </div>
  );
}

export default MainPage;
