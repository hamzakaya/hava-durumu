import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { AppStore } from "..";
import { havaDurumuGetir } from '../../api/openweathermap';
import { IExtendedForecastData, IWeatherData } from '../../api/types';
import { gunAdi, kelvinToCelcius } from '../../utils';

export interface IWeatherState {
  weatherData: IWeatherData;
  extendedWeatherData: IExtendedForecastData[];
  isRecieved: boolean;
  isError: boolean;
  isLoading: boolean;
}

const initialState: IWeatherState = {
  weatherData: {
    main: {
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    name: '',
    sys: {
      country: '',
      sunrise: 0,
      sunset: 0,
    },
    weather: {
      id: 200,
      main: '',
      description: '',
      icon: '',
    },
    wind: {
      deg: 0,
      speed: 0,
    },
  },
  extendedWeatherData: [],
  isRecieved: false,
  isError: false,
  isLoading: false,
};



export const getData = createAsyncThunk(
  "data",
  async (sehir: string | { lat: number; lon: number }, thunkAPI) => {
    try {
      const response = await havaDurumuGetir(sehir);
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
    [getData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getData.fulfilled]: (state, action) => {
      const res = havaDurumuVeriFormat(action.payload)
      state.weatherData = res.weather;
      state.extendedWeatherData = res.forecast;
      state.isLoading = false;
      state.isRecieved = true
    },
    [getData.rejected]: (state, action) => {
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



const havaDurumuVeriFormat = (
  res: any
): {
  weather: IWeatherData;
  forecast: IExtendedForecastData[];
} => {
  const weather = res.havaDurumu as IWeatherData;
  const forecast: IExtendedForecastData[] = [];

  weather.weather = res.havaDurumu.weather[ 0 ];
  weather.name = res.havaDurumu.name.replace(' Province', '')
  weather.main = {
    ...weather.main,
    temp: kelvinToCelcius(weather.main.temp),
    feels_like: kelvinToCelcius(weather.main.feels_like),
    temp_max: kelvinToCelcius(weather.main.temp_max),
    temp_min: kelvinToCelcius(weather.main.temp_min),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  res.haftalikHavaDurumu.list.forEach((i: any, index: number) => {
    forecast.push({
      day: gunAdi(i.dt),
      temp: {
        temp_max: kelvinToCelcius(i.temp.max),
        temp_min: kelvinToCelcius(i.temp.min),
      },
      weather: {
        id: i.weather.at(0)?.id,
        description: i.weather.at(0)?.description,
      },
    });
  });

  return {
    weather,
    forecast,
  };
};