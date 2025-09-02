import Modal from './Modal';
import { use, useCallback, useMemo, useState, type JSX } from 'react';
import type { extraRow } from './types';
import { extra_key } from './types';

type Row = {
  [key: string]: number | string;
};

type Location = {
  iso_code: string;
  data: extraRow[];
};

function lastFieldValue(data: Row[], key: string, year: number) {
  for (let i = data.length - 1; i >= 0; i--) {
    const row = data[i] as Record<string, number | string | null | undefined>;
    if (row.year != year) continue;
    return row[key];
  }
}

let PromiseCountry: Promise<Location[]>;

function getCountry() {
  if (!PromiseCountry) {
    PromiseCountry = fetch('owid-co2-data.json').then((response) => {
      if (!response.ok) throw new Error('Response error');
      return response.json();
    });
  }
  return PromiseCountry;
}

export default function Page_co2() {
  const [sortDirection, setSortDirection] = useState<1 | -1>(1);
  const [open, setOpen] = useState(false);
  const [extraCols, setExtraCols] = useState<string[]>([]);
  const [year, setYear] = useState<number>(2023);
  const data = use(getCountry());
  const [filterNameCountry, setfilterNameCountry] = useState<string>('');
  const [sortField, setSortField] = useState<'population' | 'countryName'>(
    'countryName'
  );

  const yearlist = useMemo<number[]>(() => {
    const setYears = new Set<number>();
    for (const key in data) {
      const arr = data[key].data;
      for (const data of arr) {
        setYears.add(data.year);
      }
    }
    const arrayYears = Array.from(setYears);
    return arrayYears.sort((a, b) => b - a);
  }, [data]);

  const toggleSort = useCallback((field: 'population' | 'countryName') => {
    setSortField(field);
    setSortDirection((dir) => (dir === 1 ? -1 : 1));
  }, []);

  const toggleCol = useCallback((key: string) => {
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
  }, []);

  const toCheckNumber = (num: unknown): number | null => {
    if (typeof num === 'number') {
      return Number.isFinite(num) ? num : null;
    } else {
      return null;
    }
  };

  const rows: JSX.Element[] = useMemo(() => {
    const items: {
      name: string;
      iso: string;
      node: Location;
      population: number | null;
      co2: string | number | undefined | null;
      co2_per_capita: string | number | undefined | null;
    }[] = [];

    for (const key in data) {
      const node = data[key];
      if (!node) continue;
      const name = key;
      const iso = node.iso_code;
      const population = toCheckNumber(
        lastFieldValue(node.data, 'population', year)
      );
      const co2 = lastFieldValue(node.data, 'co2', year);
      const co2_per_capita = lastFieldValue(node.data, 'co2_per_capita', year);
      items.push({ name, iso, node, population, co2, co2_per_capita });
    }

    const term = filterNameCountry.trim().toLowerCase();

    let filtered = items;
    if (term) {
      filtered = items.filter((item) => item.name.toLowerCase().includes(term));
    }

    filtered.sort((a, b) => {
      if (sortField === 'population') {
        const aNum = Number(a.population);
        const bNum = Number(b.population);
        return sortDirection * (aNum - bNum);
      } else {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        return sortDirection * aName.localeCompare(bName);
      }
    });

    return filtered.map(
      ({ name, iso, node, population, co2, co2_per_capita }) => (
        <tr key={name + iso}>
          <td>{name ?? 'N/A'}</td>
          <td>{iso ?? 'N/A'}</td>
          <td>{population ?? 'N/A'}</td>
          <td>{year ?? 'N/A'}</td>
          <td>{co2 ?? 'N/A'}</td>
          <td>{co2_per_capita ?? 'N/A'}</td>
          {extraCols.map((column) => (
            <td key={column}>
              {lastFieldValue(node.data, column, year) ?? 'N/A'}
            </td>
          ))}
        </tr>
      )
    );
  }, [data, extraCols, filterNameCountry, sortDirection, sortField, year]);

  return (
    <>
      <div className="main_co2">
        <div className="header">
          <input
            type="text"
            className="country_input"
            value={filterNameCountry}
            placeholder="enter the country name"
            onChange={(e) => setfilterNameCountry(e.target.value)}
          />
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
                <th>
                  <button onClick={() => toggleSort('countryName')}>
                    Country {sortDirection === 1 ? '▲' : '▼'}
                  </button>
                </th>
                <th>ISO</th>
                <th>
                  <button onClick={() => toggleSort('population')}>
                    Population {sortDirection === 1 ? '▲' : '▼'}
                  </button>
                </th>
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
