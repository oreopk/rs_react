import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  useParams,
  useSearchParams,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import ErrorButton from "./ErrorButton";
import Header from "./Header";
import { PlanetApi } from "./PlanetFetch";
import Planets from "./Planets";
import Button from "./Button";
import Input from "./Input";
import type { PlanetsListItem } from "./types";
import Pagination from "./Pagination";
import useLocalStorage from "./hooks/useLocalStorage";

const planetsPerPage = 10;

function MainPage(): React.ReactElement {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const initialRender = useRef(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const currentPage = parseInt(pageNumber || "1", 10);
  const localStorageKey: string = "starWarsQuery";
  const [inputValue, setInputValue] = useLocalStorage(
    localStorageKey,
    searchQuery,
  );
  const [searchPlanets, setPlanets] = useState<PlanetsListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPlanets, setTotalPlanets] = useState(0);
  const getPlanets = useCallback(async () => {
    let errorMessage = "Unknown error";
    setIsLoading(true);
    setError(null);
    try {
      const planets = await PlanetApi.fetchPlanets(searchQuery, currentPage);
      const firstPlanetsIndex = (currentPage - 1) * planetsPerPage;
      const lastPlanetsIndex = firstPlanetsIndex + planetsPerPage;
      const currentPlanets = planets.planets.slice(
        firstPlanetsIndex,
        lastPlanetsIndex,
      );
      setTotalPlanets(planets.count);
      setPlanets(currentPlanets);
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
  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      if (searchQuery && searchQuery !== inputValue) {
        setInputValue(searchQuery);
      }
    }
  }, [inputValue, searchQuery, setInputValue]);

  useEffect(() => {
    getPlanets();
  }, [getPlanets, searchQuery]);

  const [error, setError] = useState<string | null>(null);
  const [errorBoolean, setErrorBoolean] = useState<boolean>(false);

  function triggerError() {
    setErrorBoolean(true);
  }

  function handleSearch() {
    navigate(`/1?search=${encodeURIComponent(inputValue)}`);
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
      <div className="main-container">
        <Planets
          searchPlanets={searchPlanets}
          isLoading={isLoading}
          inputValue={inputValue}
        />
        <Outlet />
      </div>
      {isLoading ? null : (
        <Pagination
          planetsPerPage={planetsPerPage}
          totalPlanets={totalPlanets}
          currentPage={currentPage}
          searchQuery={searchQuery}
        ></Pagination>
      )}
      <ErrorButton onClick={triggerError} />
    </div>
  );
}

export default MainPage;
