import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import UncontrolledForm from "./UncontrolledForm";
import ControlledForm from "./ControlledForm";
import Tile from "./Tile";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { setUncontrolled, setControlled } from "./store/Slice";
import { type dataType } from "./store/Slice";
import type { RootState } from "./store";

export default function App() {
  const [Modal, setModal] = useState<null | "unctrl" | "ctrl">(null);
  const dispatch = useAppDispatch();
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

  const handleCtrlSubmit = (data: dataType) => {
    dispatch(setControlled(data));
    setModal(null);
  };

  const uncontrolled = useAppSelector((s: RootState) => s.form.uncontrolled);
  const controlled = useAppSelector((s: RootState) => s.form.controlled);

  return (
    <div className="App">
      <div>
        <button onClick={() => setModal("unctrl")}>Uncontrolled Form</button>
        <button onClick={() => setModal("ctrl")}>Controlled Form</button>
      </div>
      <div className="tiles">
        <Tile data={uncontrolled} />
        <Tile data={controlled} />
      </div>
      {Modal &&
        createPortal(
          <div className="modal-wrapper">
            <div>
              <button type="button" onClick={() => setModal(null)}>
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
