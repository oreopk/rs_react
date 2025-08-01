import React from "react";
import type { PlanetProperties } from "./types";

function PlanetCard({
  planet,
}: {
  planet: PlanetProperties;
}): React.ReactElement {
  return (
    <div className="planet-details">
      <h3 className="planet-name">{planet.name}</h3>
      <div className="detail-row">
        <span className="detail-label">Diameter:</span>
        <span className="prop_planet">{planet.diameter}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Climate:</span>
        <span className="prop_planet">{planet.climate}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Terrain:</span>
        <span className="prop_planet">{planet.terrain}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Population:</span>
        <span className="prop_planet">{planet.population}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Rotation Period:</span>
        <span className="prop_planet">{planet.rotation_period}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Orbital Period:</span>
        <span className="prop_planet">{planet.orbital_period}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Gravity:</span>
        <span className="prop_planet">{planet.gravity}</span>
      </div>
    </div>
  );
}

export default PlanetCard;
