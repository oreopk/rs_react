import { useAppSelector } from "../hooks/hooks.ts";
import { stateItems } from "../store/selectedItemsSlice.ts";
import { useRef, useState } from "react";
import "./SelectedPlanets.css";

export default function SelectedPlanets() {
  const selectedItems = useAppSelector(stateItems);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [filename, setFilename] = useState("");

  function download() {
    const name_column = "id,name,url \r\n";
    const download_data = selectedItems
      .map((items, id) => id + 1 + "," + items.name + "," + items.url)
      .join("\r\n");
    const csvdata = name_column + download_data;
    const csvBlob = new Blob([csvdata], { type: "text/csv" });
    const url = URL.createObjectURL(csvBlob);
    setDownloadUrl(url);
    setFilename(`${selectedItems.length}_items.csv`);
    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        URL.revokeObjectURL(url);
        setDownloadUrl("");
      }
    }, 0);
  }

  return (
    <div
      className={`selected-planets ${selectedItems.length ? "visible" : ""}`}
    >
      <h3>Selected Planets: {selectedItems.length}</h3>
      <button className="download_button" onClick={download}>
        Download
      </button>
      <a
        ref={downloadRef}
        href={downloadUrl}
        download={filename}
        style={{ display: "none" }}
      ></a>
    </div>
  );
}
