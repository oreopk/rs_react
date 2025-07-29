import PlanetCard from "./PlanetCard";
import Spinner from "./Spinner";
import type { Planet } from "./types";

interface PlanetsProps {
  searchPlanets: Planet[];
  isLoading: boolean;
  inputValue: string;
}

export default function Planets({
  searchPlanets,
  isLoading,
  inputValue,
}: PlanetsProps) {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="results-container">
          {inputValue.trim() !== "" && searchPlanets.length === 0 ? (
            <div className="nothing">Nothing</div>
          ) : (
            <div className="results-grid">
              {searchPlanets.map((planet: Planet) => (
                <PlanetCard key={planet.uid} planet={planet} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
