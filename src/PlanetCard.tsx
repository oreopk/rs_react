import React, { useEffect, useState } from "react";
import type { PlanetProperties } from "./types";
import Spinner from "./Spinner";
import { PlanetApi } from "./PlanetFetch";
import { useParams, useNavigate } from "react-router-dom";

function PlanetCard(): React.ReactElement {
  const [error, setError] = useState<string | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetProperties | null>(
    null,
  );
  const { planetId, pageNumber } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(pageNumber ? `/list/${pageNumber}` : "/");
  };

  useEffect(() => {
    const getPlanetSelect = async () => {
      let errorMessage = "Unknown error";
      try {
        if (!planetId) return null;
        setIsLoadingDetail(true);
        const planetUrl = `https://swapi.tech/api/planets/${planetId}`;
        const planetDetails = await PlanetApi.fetchPlanetDetail(planetUrl);
        setSelectedPlanet(planetDetails);
      } catch (error) {
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        setError(errorMessage);
      } finally {
        setIsLoadingDetail(false);
      }
    };
    getPlanetSelect();
  }, [planetId]);

  return (
    <div className="planet-details">
      {isLoadingDetail ? (
        <Spinner />
      ) : (
        <>
          {error ? <div data-testid="error-message">{error}</div> : null}
          {selectedPlanet && (
            <>
              <button className="close-button" onClick={handleClose}>
                Close
              </button>
              <h3 className="planet-name">{selectedPlanet.name}</h3>
              <div className="detail-row">
                <span className="detail-label">Diameter:</span>
                <span className="prop_planet">{selectedPlanet.diameter}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Climate:</span>
                <span className="prop_planet">{selectedPlanet.climate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Terrain:</span>
                <span className="prop_planet">{selectedPlanet.terrain}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Population:</span>
                <span className="prop_planet">{selectedPlanet.population}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Rotation Period:</span>
                <span className="prop_planet">
                  {selectedPlanet.rotation_period}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Orbital Period:</span>
                <span className="prop_planet">
                  {selectedPlanet.orbital_period}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Gravity:</span>
                <span className="prop_planet">{selectedPlanet.gravity}</span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default PlanetCard;
