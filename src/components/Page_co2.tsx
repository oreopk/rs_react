import Modal from './Modal';
import { useEffect, useState, type JSX } from 'react';
import type { extraRow } from './types';
import { extra_key } from './types';

type Row = {
  [key: string]: number | string;
};

type Location = {
  iso_code: string;
  data: extraRow[];
};
type datajson = Record<string, Location>;

function lastFieldValue(data: Row[], key: string, year: number) {
  for (let i = data.length - 1; i >= 0; i--) {
    const row = data[i] as Record<string, number | string | null | undefined>;
    if (row.year != year) continue;
    return row[key];
  }
}

export default function Page_co2() {
  const [data, setData] = useState<datajson | null>(null);
  const [open, setOpen] = useState(false);
  const [extraCols, setExtraCols] = useState<string[]>([]);
  const [year, setYear] = useState<number>(2023);
  const [yearlist, setyearList] = useState<number[]>([]);

  useEffect(() => {
    const getYears = () => {
      const setYears = new Set<number>();
      for (const key in data) {
        const arr = data[key].data;
        for (const data of arr) {
          setYears.add(data.year);
        }
      }
      const arrayYears = Array.from(setYears);
      return arrayYears.sort((a, b) => b - a);
    };
    if (!data) return;
    setyearList(getYears());
  }, [data]);

  useEffect(() => {
    fetch('/owid-co2-data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Response error');
        }
        return response.json();
      })
      .then((response) => setData(response));
  }, []);

  function toggleCol(key: string) {
    setExtraCols((prev) => {
      if (prev.includes(key)) {
        return prev.filter((x) => {
          if (x === key) {
            return false;
          }
          return true;
        });
      }

      return [...prev, key];
    });
  }

  const rows: JSX.Element[] = [];
  for (const key in data) {
    const node = data[key];
    if (!node) continue;
    const name = key;
    const iso = node.iso_code;
    const population = lastFieldValue(node.data, 'population', year);
    const co2 = lastFieldValue(node.data, 'co2', year);
    const co2_per_capita = lastFieldValue(node.data, 'co2_per_capita', year);
    rows.push(
      <tr key={key + iso}>
        <td>{name}</td>
        <td>{iso}</td>
        <td>{population}</td>
        <td>{year}</td>
        <td>{co2}</td>
        <td>{co2_per_capita}</td>
        {extraCols.map((column) => (
          <td key={column}>{lastFieldValue(node.data, column, year) ?? ''}</td>
        ))}
      </tr>
    );
  }
  return (
    <>
      <div className="main_co2">
        <div className="header">
          <div className="year_picker"></div>
          <button onClick={() => setOpen(true)}>Select Columns</button>
        </div>
        {open && (
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="modal_actions">
              <button className="btn_modal" onClick={() => setExtraCols([])}>
                Clear all
              </button>
              <button
                className="btn_modal"
                onClick={() => setExtraCols(extra_key)}
              >
                Select all
              </button>
              <button className="btn_modal" onClick={() => setOpen(false)}>
                X
              </button>
            </div>
            <div className="modal_body">
              <div className="checkbox_flex">
                {extra_key.map((key) => (
                  <label
                    key={key}
                    className={`check ${extraCols.includes(key) ? 'is-active' : ''}`}
                  >
                    <input
                      type="checkbox"
                      className="hidden_checkbox"
                      checked={extraCols.includes(key)}
                      onChange={() => toggleCol(key)}
                    />
                    <span className="check_label">{key}</span>
                  </label>
                ))}
              </div>
            </div>
          </Modal>
        )}
        <div className="table_wrapper">
          <table className="co2_table">
            <thead>
              <tr>
                <th>Country</th>
                <th>ISO</th>
                <th>Population</th>
                <th className="year_pick">
                  Select Year
                  <select
                    id="year"
                    className="year_select"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                  >
                    {yearlist.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </th>
                <th>Co2</th>
                <th>co2_per_capita</th>
                {extraCols.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
