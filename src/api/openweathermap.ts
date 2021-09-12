import { API_BASE_URL, API_KEY, queryString, trToEng } from "../utils";
const CACHE_DATA = new Map();


export const havaDurumuGetir = async (sehir) => {
  const KEY = JSON.stringify(sehir);
  if (CACHE_DATA.has(KEY)) return JSON.parse(CACHE_DATA.get(KEY));

  const createURL = (detay: boolean) => {
    let URL = detay ? `forecast/daily` : `weather`;
    URL += typeof sehir === "object" ? queryString(sehir) : `?q=${trToEng(sehir).toLowerCase()}`;
    return API_BASE_URL + URL + `&lang=tr&appid=${API_KEY}`;
  };

  const [bugunURL, haftalikURL] = [createURL(), createURL(true)];
  const result = await Promise.all([fetch(bugunURL), fetch(haftalikURL)])
    .then(async ([bugunDetay, haftalikHavaDurumu]) => {
      const bugunData = await bugunDetay.json();
      const haftalikData = await haftalikHavaDurumu.json();

      return {
        havaDurumu: bugunData,
        haftalikHavaDurumu: haftalikData,
      };
    })
    .catch((err) => console.error(err));

  CACHE_DATA.set(KEY, JSON.stringify(result));
  return result;
};
