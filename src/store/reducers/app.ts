import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DereceTip } from "../../utils";

export interface IAppState {
  dereceTipi: DereceTip;
  darkMode: boolean;
}

const initialState: IAppState = {
  dereceTipi: DereceTip.CELCIUS,
  darkMode: JSON.parse(
    localStorage.getItem("darkMode") || ("true" as string)
  ) as boolean,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleDarkMode: (state: IAppState) => {
      localStorage.setItem("darkMode", (!state.darkMode).toString());
      state.darkMode = !state.darkMode;
    },
    changeDereceTip: (state: IAppState) => {
      state.dereceTipi =
        state.dereceTipi === DereceTip.CELCIUS
          ? DereceTip.FAHRENHEIT
          : DereceTip.CELCIUS;
    },
  },
});

export const { changeDereceTip, toggleDarkMode } = appSlice.actions;
export default appSlice.reducer;
