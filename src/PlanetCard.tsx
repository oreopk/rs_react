import React from "react";

interface Planet {
  uid?: string;
  name?: string;
  properties: PlanetProperties;
}

interface PlanetProperties {
  name?: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  population: string;
  climate: string;
  terrain: string;
}

class PlanetCard extends React.Component<{ planet: Planet }> {
  render() {
    const { planet } = this.props;
    return (
      <div className="planet-card">
        <div className="planet-details">
          <h3 className="planet-name">{planet.name}</h3>
          <div className="detail-row">
            <span className="detail-label">Diameter:</span>
            <span className="prop_planet">{planet.properties.diameter}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Climate:</span>
            <span className="prop_planet">{planet.properties.climate}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Terrain:</span>
            <span className="prop_planet">{planet.properties.terrain}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Population:</span>
            <span className="prop_planet">{planet.properties.population}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Rotation Period:</span>
            <span className="prop_planet">
              {planet.properties.rotation_period}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Orbital Period:</span>
            <span className="prop_planet">
              {planet.properties.orbital_period}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default PlanetCard;
