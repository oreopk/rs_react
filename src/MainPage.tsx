import React, { useRef, useEffect, useContext } from "react";
import {
  useParams,
  useSearchParams,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "./App.css";
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
import { useGetPlanetsQuery } from "./PlanetRTKQuery";

const planetsPerPage = 10;

function MainPage(): React.ReactElement {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const currentPage = parseInt(pageNumber || "1", 10);
  const initialRender = useRef(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const localStorageKey: string = "starWarsQuery";
  const [inputValue, setInputValue] = useLocalStorage(
    localStorageKey,
    searchQuery,
  );

  const { theme } = useContext(ThemeContext) || {};

  const dispatch = useDispatch();

  const selectedItems = useAppSelector(stateItems);

  const {
    data: { planets = [], total_pages = 0, total_records = 0 } = {},
    error,
    isLoading,
    isFetching,
  } = useGetPlanetsQuery({ page: currentPage, search: searchQuery });

  const toggleItemSelection = (item: PlanetsListItem) => {
    if (selectedItems.some((selected) => selected.uid === item.uid)) {
      dispatch(removeItem(item.uid));
    } else {
      dispatch(addItem(item));
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      if (searchQuery && searchQuery !== inputValue) {
        setInputValue(searchQuery);
      }
    }
  }, [inputValue, searchQuery, setInputValue]);

  function handleSearch() {
    navigate(`/list/1?search=${encodeURIComponent(inputValue)}`);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <>
      <h1 className={`title ${theme}`}>Star Wars Planets</h1>
      {error ? (
        <div data-testid="error-message">{JSON.stringify(error)}</div>
      ) : null}
      <div className={`search-container ${theme}`}>
        <Input value={inputValue} onChange={handleInputChange} />
        <Button onClick={handleSearch}>{"Search"}</Button>
      </div>
      <div className="main-container">
        <Planets
          searchPlanets={planets}
          isLoading={isLoading || isFetching}
          inputValue={inputValue}
          onItemSelect={toggleItemSelection}
          selectedItems={selectedItems}
        />
        <Outlet />
      </div>
      {isLoading ? null : (
        <Pagination
          planetsPerPage={planetsPerPage}
          totalPlanets={total_records}
          currentPage={currentPage}
          searchQuery={searchQuery}
        ></Pagination>
      )}
      {!isLoading && <SelectedPlanets />}
    </>
  );
}

export default MainPage;
