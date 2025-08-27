import { useState, useEffect, type JSX } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import UncontrolledForm from "./UncontrolledForm";
import ControlledForm from "./ControlledForm";
import Tile from "./Tile";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { setUncontrolled, setControlled } from "./store/formSlice";
import { type dataType } from "./store/formSlice";
import type { RootState } from "./store";
import { setCountries } from "./store/countrySlice";

export default function App() {
  const [Modal, setModal] = useState<null | "unctrl" | "ctrl">(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const load = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      const data: { name: { common: string } }[] = await res.json();

      const countryNames = data.map((country) => country.name.common);
      dispatch(setCountries(countryNames));
    };
    load();
  }, [dispatch]);

  useEffect(() => {
    if (!Modal) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    document.body.addEventListener("keydown", onEscape);
    return () => {
      document.body.removeEventListener("keydown", onEscape);
    };
  }, [Modal]);

  const handleUnctrlSubmit = (data: dataType) => {
    dispatch(setUncontrolled(data));
    setModal(null);
  };
  const tilesUncontrolled: JSX.Element[] = [];
  const tilesControlled: JSX.Element[] = [];

  const handleCtrlSubmit = (data: dataType) => {
    dispatch(setControlled(data));
    setModal(null);
  };

  const uncontrolled = useAppSelector((s: RootState) => s.form.uncontrolled);
  const controlled = useAppSelector((s: RootState) => s.form.controlled);

  for (let i = 0; i < uncontrolled.length; i++) {
    tilesUncontrolled.push(<Tile data={uncontrolled[i]} key={`${i}`} />);
  }

  for (let i = 0; i < controlled.length; i++) {
    tilesControlled.push(<Tile data={controlled[i]} key={`${i}`} />);
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => setModal("unctrl")}>Uncontrolled Form</button>
        <button onClick={() => setModal("ctrl")}>Controlled Form</button>
      </div>
      <div className="tiles">
        <div className="tiles-column"> {tilesUncontrolled}</div>
        <div className="tiles-column">{tilesControlled}</div>
      </div>
      {Modal &&
        createPortal(
          <div className="modal-wrapper">
            <div>
              <button
                className="close_button"
                type="button"
                onClick={() => setModal(null)}
              >
                Close
              </button>
            </div>
            <div className="modal">
              {Modal === "unctrl" ? (
                <UncontrolledForm onSubmit={handleUnctrlSubmit} />
              ) : (
                <ControlledForm onSubmit={handleCtrlSubmit} />
              )}
            </div>
          </div>,
          document.getElementById("portal-root") ?? document.body,
        )}
    </div>
  );
}
