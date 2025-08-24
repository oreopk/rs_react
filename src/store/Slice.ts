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
  uncontrolled: dataType | null;
  controlled: dataType | null;
}

const initialState: FormState = {
  uncontrolled: null,
  controlled: null,
};

const formSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setUncontrolled: (state, action: PayloadAction<dataType>) => {
      state.uncontrolled = action.payload;
    },
    setControlled: (state, action: PayloadAction<dataType>) => {
      state.controlled = action.payload;
    },
    reset: (state) => {
      state.uncontrolled = null;
      state.controlled = null;
    },
  },
});

export const { setUncontrolled, setControlled, reset } = formSlice.actions;
export default formSlice.reducer;
