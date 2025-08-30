import { use, type JSX } from 'react';

type Location = {
  iso_code: string;
  data: { year: number; population: number }[];
};
type datajson = Record<string, Location>;
type YearRow = { year: number; population?: number };

function lastPopulation(data: YearRow[]) {
  for (let i = data.length - 1; i >= 0; i--) {
    const population = data[i].population;
    if (population) {
      return {
        year: data[i].year,
        population: Number(population),
      };
    }
  }
  return { year: [], population: [] };
}

const Promise_co2 = fetch('/owid-co2-data.json').then((response) => {
  if (!response.ok) {
    throw new Error('Response error');
  }
  return response.json();
});

export default function Page_co2() {
  const rows: JSX.Element[] = [];
  const data = use<datajson>(Promise_co2);
  for (const key in data) {
    const node = data[key];
    if (!node) continue;
    const name = key;
    const iso = node.iso_code;
    const { year, population } = lastPopulation(node.data);
    rows.push(
      <tr key={key + iso}>
        <td>{name}</td>
        <td>{iso}</td>
        <td>{population}</td>
        <td>{year}</td>
      </tr>
    );
  }
  return (
    <>
      <div className="main_co2">
        <table className="co2_table">
          <thead>
            <tr>
              <th>Country</th>
              <th>ISO</th>
              <th>Population</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  );
}
