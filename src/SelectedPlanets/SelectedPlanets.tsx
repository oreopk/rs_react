import type { PlanetsListItem } from "../types.ts";
import { useAppSelector } from "../hooks/hooks.ts";
import { stateItems } from "../store/selectedItemsSlice.ts";
import "./SelectedPlanets.css";

export default function SelectedPlanets() {
  const selectedItems = useAppSelector(stateItems);
  const hasItems = selectedItems.length > 0;

  return (
    <div className={`selected-planets ${hasItems ? "visible" : ""}`}>
      <h3>Selected Planets</h3>
      <div className="selected-planets-list">
        {selectedItems.map((planet: PlanetsListItem) => (
          <div key={planet.uid} className="selected-planet">
            {planet.name}
          </div>
        ))}
      </div>
    </div>
  );
}
