"use client";

import React, { useRef, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Planets from "../../../../Planets";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Pagination from "../../../../components/Pagination/Pagination";
import type { PlanetsListItem } from "../../../../types";
import useLocalStorage from "../../../../hooks/useLocalStorage";
// import { ThemeContext } from "../../providers/ThemeContext.ts";
import { useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  stateItems,
} from "../../../../store/selectedItemsSlice";
import SelectedPlanets from "../../../../SelectedPlanets/SelectedPlanets";
import { useAppSelector } from "../../../../hooks/hooks";
import { useGetPlanetsQuery } from "../../../../PlanetRTKQuery";

function MainPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pageParam = params.pageNumber;
  let page = "1";
  if (Array.isArray(pageParam) && pageParam) {
    page = pageParam[0];
  } else if (pageParam) {
    page = pageParam;
  }
  const currentPage = parseInt(page, 10);
  const searchQuery = searchParams?.get("search") || "";

  const initialRender = useRef(true);

  const localStorageKey: string = "starWarsQuery";
  const [inputValue, setInputValue] = useLocalStorage(
    localStorageKey,
    searchQuery,
  );

  // const { theme } = useContext(ThemeContext) || {};
  const theme = "light";
  const dispatch = useDispatch();

  const selectedItems = useAppSelector(stateItems);

  const {
    data: { planets = [], total_records = 0 } = {},
    // data: { planets = [] } = {},
    error,
    isLoading,
    isFetching,
    refetch,
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
    router.push(`/list/1?search=${encodeURIComponent(inputValue)}`);
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
      </div>
      {isLoading ? null : (
        <Pagination
          planetsPerPage={10}
          totalPlanets={total_records}
          currentPage={currentPage}
          searchQuery={searchQuery}
          refetch={refetch}
        ></Pagination>
      )}
      {!isLoading && <SelectedPlanets />}
    </>
  );
}

export default MainPage;
