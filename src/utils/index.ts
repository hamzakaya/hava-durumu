export const DEFAULT_CITY = "ankara" as const;
export const API_BASE_URL = "https://api.openweathermap.org/data/2.5/" as const;
export const API_KEY = "20571ab45c74dc2a1897b60c5b8047a1" as const;

export enum DereceTip {
  CELCIUS,
  FAHRENHEIT,
}

export const kelvinToCelcius = (num: number) => Math.round(num - 273.15);
export const celciusToFahrenheit = (c: number) => Math.round(c * (9 / 5) + 32);
export const fahrenheitToCelcius = (f: number) =>
  Math.round(((f - 32) * 5) / 9);
export const kmToMile = (n: number) => Math.round(n / 1.60934);
export const mileToKm = (n: number) => Math.round(n * 1.60934);

export const gunAdi = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleString("tr-TR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

export function getPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

export const queryString = (params) =>
  ["?"]
    .concat(
      Object.keys(params).map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
    )
    .join("&");

export const trToEng = (str: string): string =>
  str
    .replace("Ğ", "g")
    .replace("Ü", "u")
    .replace("Ş", "s")
    .replace("I", "i")
    .replace("İ", "i")
    .replace("Ö", "o")
    .replace("Ç", "c")
    .replace("ğ", "g")
    .replace("ü", "u")
    .replace("ş", "s")
    .replace("ı", "i")
    .replace("ö", "o")
    .replace("ç", "c");
