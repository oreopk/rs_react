"use client";

import { useAppSelector } from "../hooks/hooks.ts";
import { stateItems, clearAllItems } from "../store/selectedItemsSlice.ts";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./SelectedPlanets.css";

export default function SelectedPlanets() {
  const selectedItems = useAppSelector(stateItems);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | undefined>("");
  const [filename, setFilename] = useState<string | undefined>("");

  const dispatch = useDispatch();

  const handleClearAll = () => {
    dispatch(clearAllItems());
  };
  useEffect(() => {
    if (!downloadRef.current || !downloadUrl) return;
    downloadRef.current.click();
    setDownloadUrl(undefined);
    setFilename(undefined);
  }, [downloadUrl, filename]);

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  async function download() {
    const response = await fetch("/api/selectedplanet", {
      method: "POST",
      body: JSON.stringify({ items: selectedItems }),
    });

    if (!response.ok) throw new Error(`Error get data CSV`);
    const { csvdata } = await response.json();
    const csvBlob = new Blob([csvdata], { type: "text/csv" });
    const url = URL.createObjectURL(csvBlob);
    setDownloadUrl(url);
    setFilename(`${selectedItems.length}_items.csv`);
  }

  return (
    <div
      className={`selected-planets ${selectedItems.length ? "visible" : ""}`}
    >
      <h3>Selected Planets: {selectedItems.length}</h3>
      <button className="download_button" onClick={download}>
        Download
      </button>
      <button className="clear_button" onClick={handleClearAll}>
        Clear All Selected
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
