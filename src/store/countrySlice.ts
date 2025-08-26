import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

const countriesSlice = createSlice({
  name: "countries",
  initialState: { list: [] as string[] },
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.list = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
export const selectCountries = (state: RootState) => state.countries.list;
