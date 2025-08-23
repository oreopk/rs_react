import { useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import UncontrolledForm from "./UncontrolledForm";
import ControlledForm from "./ControlledForm";

export default function App() {
  const [Modal, setModal] = useState<null | "unctrl" | "ctrl">(null);

  return (
    <div className="App">
      <div>
        <button onClick={() => setModal("unctrl")}>Uncontrolled Form</button>
        <button onClick={() => setModal("ctrl")}>Controlled Form</button>
      </div>

      {Modal &&
        createPortal(
          <div>
            <div>
              <button type="button" onClick={() => setModal(null)}>
                Close
              </button>
            </div>
            <div className="modal">
              {Modal === "unctrl" ? <UncontrolledForm /> : <ControlledForm />}
            </div>
          </div>,
          document.getElementById("portal-root") ?? document.body,
        )}
    </div>
  );
}
