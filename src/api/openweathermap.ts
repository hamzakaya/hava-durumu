import { API_BASE_URL, API_KEY, gunAdi, kelvinToCelcius, queryString, trToEng } from "../utils";
import { IExtendedForecastData, IWeatherData } from "./types";
const CACHE_DATA = new Map();

type ResponseType = {
  weather: IWeatherData;
  forecast: IExtendedForecastData[];
};

export const openweathermap = async (sehir: string | object): ResponseType => {
  const KEY = JSON.stringify(sehir);
  if (CACHE_DATA.has(KEY)) return JSON.parse(CACHE_DATA.get(KEY));

  const createURL = (detay: boolean) => {
    let URL = detay ? `forecast/daily` : `weather`;
    URL +=
      typeof sehir === "object"
        ? queryString(sehir)
        : `?q=${trToEng(sehir).toLowerCase()}`;
    return API_BASE_URL + URL + `&cnt=8&lang=tr&appid=${API_KEY}`;
  };

  const [bugunURL, haftalikURL] = [createURL(), createURL(true)];
  
  const result = await Promise.all([fetch(bugunURL), fetch(haftalikURL)])
    .then(async ([bugunDetay, haftalikHavaDurumu]) => {
      const bugunData = await bugunDetay.json();
      const haftalikData = await haftalikHavaDurumu.json();

      return havaDurumuVeriFormat({
        havaDurumu: bugunData,
        haftalikHavaDurumu: haftalikData,
      });
    })
    .catch((err) => console.error(err));

  CACHE_DATA.set(KEY, JSON.stringify(result));
  return result;
};


export const havaDurumuVeriFormat = (res: any): ResponseType => {
  const weather = res.havaDurumu as IWeatherData;
  const forecast: IExtendedForecastData[] = [];

  weather.weather = res.havaDurumu.weather[0];
  weather.name = res.havaDurumu.name.replace(" Province", "");
  weather.main = {
    ...weather.main,
    temp: kelvinToCelcius(weather.main.temp),
    feels_like: kelvinToCelcius(weather.main.feels_like),
    temp_max: kelvinToCelcius(weather.main.temp_max),
    temp_min: kelvinToCelcius(weather.main.temp_min),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  const [, ...haftalikHavaDurumu] = res.haftalikHavaDurumu.list;
  
  haftalikHavaDurumu.forEach((i: any, index: number) => {
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
