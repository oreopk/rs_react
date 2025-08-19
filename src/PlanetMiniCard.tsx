"use client";

import React from "react";
import type { PlanetsListItem } from "./types";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItem, removeItem, stateItems } from "./store/selectedItemsSlice";
import { useAppSelector } from "./hooks/hooks.ts";

interface PlanetMiniCardProps {
  planet: PlanetsListItem;
}

function PlanetMiniCard({ planet }: PlanetMiniCardProps): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const pageParam = (params?.pageNumber ?? "") as string | string[];
  const pageNumber = Array.isArray(pageParam)
    ? pageParam[0]
    : pageParam || undefined;

  const qs = searchParams?.get("search") || "";

  const dispatch = useDispatch();
  const selectedItems = useAppSelector(stateItems);

  const id = planet.url.split("/").pop();

  const isSelected = selectedItems.some((item) => item.uid === planet.uid);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (isSelected) {
      dispatch(removeItem(planet.uid));
    } else {
      dispatch(addItem(planet));
    }
  };

  const handleCardClick = () => {
    const basePage = pageNumber ?? "1";
    router.push(`/list/${basePage}/${id}?search=${encodeURIComponent(qs)}`);
  };

  return (
    <div className="planet-card" role="article" onClick={handleCardClick}>
      <h3 className="planet-name">{planet.name}</h3>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        className="planet-checkbox"
      />
    </div>
  );
}

export default PlanetMiniCard;
