import Spinner from "./Spinner";
import type { PlanetsListItem } from "./types";
import PlanetMiniCard from "./PlanetMiniCard";

interface PlanetsProps {
  searchPlanets: PlanetsListItem[];
  isLoading: boolean;
  inputValue: string;
  onItemSelect: (item: PlanetsListItem) => void;
  selectedItems: PlanetsListItem[];
}

export default function Planets({
  searchPlanets,
  isLoading,
  inputValue,
}: PlanetsProps) {
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="results-container">
          {inputValue.trim() !== "" && searchPlanets.length === 0 ? (
            <div className="nothing">Nothing</div>
          ) : (
            <div className="results-grid">
              {searchPlanets.map((planet: PlanetsListItem) => (
                <PlanetMiniCard key={planet.uid} planet={planet} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
