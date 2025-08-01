import React from "react";
import type { PlanetsListItem } from "./types";

interface PlanetMiniCardProps {
  planet: PlanetsListItem;
  onPlanetSelect: (url: string) => void;
}

function PlanetMiniCard({
  planet,
  onPlanetSelect,
}: PlanetMiniCardProps): React.ReactElement {
  return (
    <div
      className="planet-card"
      role="article"
      onClick={() => planet.url && onPlanetSelect(planet.url)}
    >
      <h3 className="planet-name">{planet.name}</h3>
    </div>
  );
}

export default PlanetMiniCard;
