import { configureStore } from "@reduxjs/toolkit";
import selectedItemsReducer from "./selectedItemsSlice";

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
