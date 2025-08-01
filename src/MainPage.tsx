import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import Spinner from "./Spinner";
import ErrorButton from "./ErrorButton";
import Header from "./Header";
import { PlanetApi } from "./PlanetFetch";
import Planets from "./Planets";
import Button from "./Button";
import Input from "./Input";
import type { PlanetProperties, PlanetsListItem } from "./types";
import Pagination from "./Pagination";
import useLocalStorage from "./hooks/useLocalStorage";
import PlanetCard from "./PlanetCard";
const planetsPerPage = 10;
function MainPage(): React.ReactElement {
  const localStorageKey: string = "starWarsQuery";
  const [inputValue, setInputValue] = useLocalStorage(localStorageKey, "");
  const [searchValue, setsearchValue] = useLocalStorage(localStorageKey, "");
  const [searchPlanets, setPlanets] = useState<PlanetsListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPlanets, setTotalPlanets] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetProperties | null>(
    null,
  );
  const [showPlanetDetails, setShowPlanetDetails] = useState(false);
  const getPlanets = useCallback(async () => {
    let errorMessage = "Unknown error";
    setIsLoading(true);
    setError(null);
    try {
      const planets = await PlanetApi.fetchPlanets(searchValue, currentPage);
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
  }, [currentPage, searchValue]);

  useEffect(() => {
    setShowPlanetDetails(false);
    getPlanets();
  }, [getPlanets]);

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    setCurrentPage(page);
  }, [searchParams]);

  const getPlanetSelect = async (planetUrl: string) => {
    let errorMessage = "Unknown error";
    try {
      setIsLoadingDetail(true);
      const planetDetails = await PlanetApi.fetchPlanetDetail(planetUrl);
      setSelectedPlanet(planetDetails);
      setShowPlanetDetails(true);
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      setError(errorMessage);
    } finally {
      setIsLoadingDetail(false);
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
    setCurrentPage(1);
    setsearchValue(inputValue);
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
          onPlanetSelect={getPlanetSelect}
        />
        {isLoadingDetail ? (
          <Spinner />
        ) : (
          showPlanetDetails &&
          selectedPlanet && <PlanetCard planet={selectedPlanet} />
        )}
      </div>
      {isLoading ? null : (
        <Pagination
          planetsPerPage={planetsPerPage}
          totalPlanets={totalPlanets}
          paginate={paginate}
          currentPage={currentPage}
        ></Pagination>
      )}
      <ErrorButton onClick={triggerError} />
    </div>
  );
}

export default MainPage;
