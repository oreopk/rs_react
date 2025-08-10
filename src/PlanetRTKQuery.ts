import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PlanetsListItem, PlanetProperties } from "./types";

interface Response {
  results: PlanetsListItem[];
  total_pages: number;
  total_records: number;
}

interface PlanetDetailsResponseSearch {
  result: {
    properties: PlanetProperties;
    uid: string;
  }[];
}

export const planetsApi = createApi({
  reducerPath: "planetsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.tech/api/" }),
  endpoints: (builder) => ({
    getPlanets: builder.query<
      {
        planets: PlanetsListItem[];
        total_pages: number;
        total_records: number;
      },
      { page?: number; search?: string }
    >({
      query: ({ page = 1, search = "" }) => {
        if (search) {
          return {
            url: `planets`,
            params: { name: search },
          };
        }
        return {
          url: `planets`,
          params: { page: page, limit: 10 },
        };
      },
      transformResponse: (
        response: Response | PlanetDetailsResponseSearch,
        _meta,
        arg,
      ): {
        planets: PlanetsListItem[];
        total_pages: number;
        total_records: number;
      } => {
        let allPlanets: PlanetsListItem[];
        let total_records: number;
        let total_pages: number;
        if ("results" in response) {
          allPlanets = response.results.map((planet) => ({
            uid: planet.uid,
            name: planet.name,
            url: planet.url,
          }));
          total_records = response.total_records;
          total_pages = response.total_pages;
        } else {
          allPlanets = response.result.map((item) => ({
            uid: item.uid,
            name: item.properties.name,
            url: item.properties.url,
          }));
          total_records = allPlanets.length;
          total_pages = Math.ceil(total_records / 10);
        }
        if (arg.search && arg.page) {
          const firstPlanetsIndex = (arg.page - 1 || 0) * 10;
          const lastPlanetsIndex = firstPlanetsIndex + 10;
          const planets = allPlanets.slice(firstPlanetsIndex, lastPlanetsIndex);
          return {
            planets: planets,
            total_pages: total_pages,
            total_records: allPlanets.length,
          };
        } else {
          return {
            planets: allPlanets,
            total_pages: total_pages,
            total_records: total_records,
          };
        }
      },
    }),
  }),
});

export const { useGetPlanetsQuery } = planetsApi;
