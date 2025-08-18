"use client";

import Spinner from "../../../../../components/Spinner/Spinner";
import { useGetPlanetDetailsQuery } from "../../../../../PlanetRTKQuery";
import { Link } from "@/i18n/navigation";
import { useParams, useSearchParams } from "next/navigation";

function PlanetCard(): React.ReactElement | null {
  const params = useParams<{
    pageNumber?: string | string[];
    planetId?: string | string[];
  }>();
  const searchParams = useSearchParams();

  const pageParam = params?.pageNumber;
  let page = "1";
  if (Array.isArray(pageParam)) {
    if (pageParam[0]) {
      page = pageParam[0];
    } else {
      page = "1";
    }
  } else if (pageParam) {
    page = pageParam;
  }

  const planetParam = params?.planetId;
  let planetId = "";
  if (Array.isArray(planetParam)) {
    planetId = planetParam[0] ?? "";
  } else if (planetParam) {
    planetId = planetParam;
  }
  const search = searchParams?.get("search") ?? undefined;

  const href: {
    pathname: "/list/[pageNumber]";
    params: { pageNumber: string };
    query?: { search: string };
  } = { pathname: "/list/[pageNumber]", params: { pageNumber: page } };

  if (search) {
    href.query = { search };
  }

  const {
    data: selectedPlanet,
    error,
    isLoading,
    isFetching,
  } = useGetPlanetDetailsQuery(planetId);

  if (!planetId) return null;

  return (
    <>
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        <>
          {error ? (
            <div data-testid="error-message">{JSON.stringify(error)}</div>
          ) : null}
          {selectedPlanet && (
            <>
              <Link href={href} className="close-button">
                Close
              </Link>
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
    </>
  );
}

export default PlanetCard;
