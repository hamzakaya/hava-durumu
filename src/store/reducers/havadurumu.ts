import {
  createAsyncThunk,
  createSlice,
  createSelector,
  Action,
} from "@reduxjs/toolkit";
import { AppStore } from "..";
import { openweathermap } from "../../api/openweathermap";
import { IExtendedForecastData, IWeatherData } from "../../api/types";

export interface IWeatherState {
  weatherData: IWeatherData;
  extendedWeatherData: IExtendedForecastData[];
  isRecieved: boolean;
  isError: boolean;
  isLoading: boolean;
}

const initialState: IWeatherState = {
  weatherData: null,
  extendedWeatherData: [],
  isRecieved: false,
  isError: false,
  isLoading: false,
};

export const getData = createAsyncThunk(
  "data",
  async (sehir: string | { lat: number; lon: number }, thunkAPI) => {
    try {
      const response = await openweathermap(sehir);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: "Bir hata oluştu...",
      });
    }
  }
);

const havaDurumuSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getData.pending]: (state: IWeatherState) => {
      state.isLoading = true;
    },
    [getData.fulfilled]: (state: IWeatherState, action: Action) => {
      const { weather, forecast } = action.payload;
      state.weatherData = weather;
      state.extendedWeatherData = forecast;
      state.isLoading = false;
      state.isRecieved = true;
    },
    [getData.rejected]: (state: IWeatherState) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const haftalikHavaDurumu = createSelector(
  (state: AppStore) => ({
    loading: state.data.isLoading,
    recieved: state.data.isRecieved,
    data: state.data.extendedWeatherData,
  }),
  (state: AppStore) => state
);

export const havaDurumuDetay = createSelector(
  (state: AppStore) => ({
    dereceTipi: state.app.dereceTipi,
    isLoading: state.data.isLoading,
    weather: state.data.weatherData,
    recieved: state.data.isRecieved,
    isError: state.data.isError,
  }),
  (state) => state
);

export default havaDurumuSlice.reducer;
