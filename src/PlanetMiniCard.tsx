import React from "react";
import type { PlanetsListItem } from "./types";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, removeItem, stateItems } from "./store/selectedItemsSlice";
import { useAppSelector } from "./hooks/hooks.ts";

interface PlanetMiniCardProps {
  planet: PlanetsListItem;
}

function PlanetMiniCard({ planet }: PlanetMiniCardProps): React.ReactElement {
  const { pageNumber } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const navigate = useNavigate();

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
    if (!pageNumber) {
      navigate(`/list/1/${id}?search=${searchQuery}`);
    } else {
      navigate(`/list/${pageNumber}/${id}?search=${searchQuery}`);
    }
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
