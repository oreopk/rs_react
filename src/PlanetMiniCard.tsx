import React from "react";
import type { PlanetsListItem } from "./types";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
interface PlanetMiniCardProps {
  planet: PlanetsListItem;
}

function PlanetMiniCard({ planet }: PlanetMiniCardProps): React.ReactElement {
  const { pageNumber } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const navigate = useNavigate();
  const id = planet.url.split("/").pop();
  return (
    <div
      className="planet-card"
      role="article"
      onClick={() => {
        if (!pageNumber) {
          navigate(`/list/1/${id}?search=${searchQuery}`);
        } else {
          navigate(`/list/${pageNumber}/${id}?search=${searchQuery}`);
        }
      }}
    >
      <h3 className="planet-name">{planet.name}</h3>
    </div>
  );
}

export default PlanetMiniCard;
