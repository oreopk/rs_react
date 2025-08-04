import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PlanetsListItem } from "../types";
import type { RootState } from "../store/store";

interface SelectedItemsState {
  items: PlanetsListItem[];
}

const initialState: SelectedItemsState = {
  items: [],
};

export const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<PlanetsListItem>) => {
      if (!state.items.find((item) => item.uid === action.payload.uid)) {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.uid !== action.payload);
    },
  },
});

export const stateItems = (state: RootState) => state.selectedItems.items;

export const { addItem, removeItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
