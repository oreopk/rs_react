import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type dataType = {
  name: string;
  age: number;
  email: string;
  password1: string;
  password2: string;
  gender: "male" | "female";
  country: string;
  terms: boolean;
};

interface FormState {
  uncontrolled: dataType[];
  controlled: dataType[];
}

const initialState: FormState = {
  uncontrolled: [],
  controlled: [],
};

const formSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setUncontrolled: (state, action: PayloadAction<dataType>) => {
      state.uncontrolled.push(action.payload);
    },
    setControlled: (state, action: PayloadAction<dataType>) => {
      state.controlled.push(action.payload);
    },
    reset: (state) => {
      state.uncontrolled = [];
      state.controlled = [];
    },
  },
});

export const { setUncontrolled, setControlled, reset } = formSlice.actions;
export default formSlice.reducer;
