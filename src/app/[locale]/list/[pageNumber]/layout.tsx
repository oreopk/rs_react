"use client";

import React, { useRef, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import PlanetsHeader from "../../../../components/PlanetsHeader/PlanetsHeader";

import Pagination from "../../../../components/Pagination/Pagination";
import useLocalStorage from "../../../../hooks/useLocalStorage";
// import { ThemeContext } from "../../providers/ThemeContext.ts";

import SelectedPlanets from "../../../../SelectedPlanets/SelectedPlanets";
import { useGetPlanetsQuery } from "../../../../PlanetRTKQuery";

export default function PageNumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  const {
    data: { total_records = 0 } = {},
    refetch,
    isLoading,
  } = useGetPlanetsQuery({
    page: currentPage,
    search: searchQuery,
  });

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
      <PlanetsHeader
        theme={theme}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
      />
      {isLoading ? null : (
        <Pagination
          planetsPerPage={10}
          totalPlanets={total_records}
          currentPage={currentPage}
          searchQuery={searchQuery}
          refetch={refetch}
        ></Pagination>
      )}
      {children}
      {!isLoading && <SelectedPlanets />}
    </>
  );
}
