"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItem, removeItem, stateItems } from "@/store/selectedItemsSlice";
import { useAppSelector } from "@/hooks/hooks";
import { useGetPlanetsQuery } from "@/PlanetRTKQuery";
import Planets from "@/Planets";
import type { PlanetsListItem } from "@/types";

export default function List_and_detail({
  right,
}: {
  right?: React.ReactNode;
}) {
  const params = useParams<{ pageNumber?: string | string[] }>();
  const searchParams = useSearchParams();

  const pageParam = params.pageNumber;
  let page = "1";
  if (Array.isArray(pageParam) && pageParam) {
    page = pageParam[0];
  } else if (pageParam) {
    page = pageParam;
  }
  const currentPage = parseInt(page, 10) || 1;
  const searchQuery = searchParams?.get("search") || "";

  const {
    data: { planets = [] } = {},
    isLoading,
    isFetching,
  } = useGetPlanetsQuery({ page: currentPage, search: searchQuery });

  const dispatch = useDispatch();
  const selectedItems = useAppSelector(stateItems);

  const toggleItemSelection = (item: PlanetsListItem) => {
    if (selectedItems.some((s) => s.uid === item.uid)) {
      dispatch(removeItem(item.uid));
    } else {
      dispatch(addItem(item));
    }
  };

  return (
    <div className="main-container">
      <Planets
        searchPlanets={planets}
        isLoading={isLoading || isFetching}
        inputValue={searchQuery}
        onItemSelect={toggleItemSelection}
        selectedItems={selectedItems}
      />
      <div className="planet-details">{right}</div>
    </div>
  );
}
