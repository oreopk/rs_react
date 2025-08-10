import Spinner from "./Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPlanetDetailsQuery } from "./PlanetRTKQuery";

function PlanetCard(): React.ReactElement {
  const { planetId, pageNumber } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(pageNumber ? `/list/${pageNumber}` : "/");
  };

  const {
    data: selectedPlanet,
    error,
    isLoading,
    isFetching,
  } = useGetPlanetDetailsQuery(planetId);

  return (
    <div className="planet-details">
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        <>
          {error ? (
            <div data-testid="error-message">{JSON.stringify(error)}</div>
          ) : null}
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
