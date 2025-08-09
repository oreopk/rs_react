import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PlanetsListItem } from "./types";

interface Response {
  results: {
    uid: string;
    name: string;
    url: string;
  }[];
}

export const planetsApi = createApi({
  reducerPath: "planetsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.tech/api/" }),
  endpoints: (builder) => ({
    getPlanets: builder.query<PlanetsListItem[], string>({
      query: () => `planets`,
      transformResponse: (response: Response): PlanetsListItem[] => {
        // console.log(response);
        return response.results.map((planet: PlanetsListItem) => ({
          uid: planet.uid,
          name: planet.name,
          url: planet.url,
        }));
      },
    }),
  }),
});

export const { useGetPlanetsQuery } = planetsApi;
