export interface IWeatherData {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

export interface IExtendedForecastData {
  day: string;
  temp: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    description: string;
  };
}


export type ResponseType = {
  weather: IWeatherData;
  forecast: IExtendedForecastData[];
};