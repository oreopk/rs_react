import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import {
  useParams,
  useSearchParams,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import { PlanetApi } from "./PlanetFetch";
import Planets from "./Planets";
import Button from "./Button";
import Input from "./Input";
import type { PlanetsListItem } from "./types";
import Pagination from "./Pagination";
import useLocalStorage from "./hooks/useLocalStorage";
import { ThemeContext } from "./ThemeContext";
import { useDispatch } from "react-redux";
import { addItem, removeItem, stateItems } from "./store/selectedItemsSlice";
import SelectedPlanets from "./SelectedPlanets/SelectedPlanets.tsx";
import { useAppSelector } from "./hooks/hooks.ts";
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

  const { theme } = useContext(ThemeContext) || {};

  const dispatch = useDispatch();

  const selectedItems = useAppSelector(stateItems);

  const toggleItemSelection = (item: PlanetsListItem) => {
    if (selectedItems.some((selected) => selected.uid === item.uid)) {
      dispatch(removeItem(item.uid));
    } else {
      dispatch(addItem(item));
    }
  };

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
    navigate(`/list/1?search=${encodeURIComponent(inputValue)}`);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  if (errorBoolean) {
    throw new Error("Test error");
  }

  return (
    <div className={`app-container ${theme}`} data-testid="app">
      <Header handleError={triggerError}></Header>
      <h1 className={`title ${theme}`}>Star Wars Planets</h1>

      {error ? <div data-testid="error-message">{error}</div> : null}

      <div className={`search-container ${theme}`}>
        <Input value={inputValue} onChange={handleInputChange} />
        <Button onClick={handleSearch}>{"Search"}</Button>
      </div>
      <div className="main-container">
        <Planets
          searchPlanets={searchPlanets}
          isLoading={isLoading}
          inputValue={inputValue}
          onItemSelect={toggleItemSelection}
          selectedItems={selectedItems}
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
      {!isLoading && <SelectedPlanets />}
    </div>
  );
}

export default MainPage;
