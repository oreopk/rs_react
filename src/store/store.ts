import { configureStore } from "@reduxjs/toolkit";
import selectedItemsReducer from "./selectedItemsSlice";
import { planetsApi } from "../PlanetRTKQuery";

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [planetsApi.reducerPath]: planetsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(planetsApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
