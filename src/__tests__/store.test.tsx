import { store } from "../store/index";
import {
  reset,
  setControlled,
  setUncontrolled,
  type dataType,
} from "../store/formSlice";
import { describe, it, expect } from "vitest";

describe("formSlice with store", () => {
  it("should state get data", () => {
    const data: dataType = {
      name: "Pavel",
      age: 25,
      email: "example@example.com",
      password1: "Qwerty9#",
      password2: "Qwerty9#",
      gender: "male",
      country: "Russia",
      terms: true,
    };

    store.dispatch(setUncontrolled(data));
    store.dispatch(setControlled(data));

    let state = store.getState().form;
    expect(state.uncontrolled).toHaveLength(1);
    expect(state.controlled).toHaveLength(1);
    expect(state.uncontrolled[0]).toEqual(data);
    expect(state.controlled[0]).toEqual(data);

    store.dispatch(reset());
    state = store.getState().form;
    expect(state).toEqual({ uncontrolled: [], controlled: [] });
  });
});
