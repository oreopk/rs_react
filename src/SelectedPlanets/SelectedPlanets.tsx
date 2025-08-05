import { useAppSelector } from "../hooks/hooks.ts";
import { stateItems } from "../store/selectedItemsSlice.ts";
import "./SelectedPlanets.css";

export default function SelectedPlanets() {
  const selectedItems = useAppSelector(stateItems);
  const hasItems = selectedItems.length > 0;

  return (
    <div className={`selected-planets ${hasItems ? "visible" : ""}`}>
      <h3>Selected Planets: {selectedItems.length}</h3>
    </div>
  );
}
