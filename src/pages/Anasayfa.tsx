import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";
import Spinner from "../components/ui/Spinner/Spinner";
import HavaDurumu from "../components/HavaDurumu";
import HaftalikHavaDurumu from "../components/HaftalikHavaDurumu";
import { getData } from "../store/reducers/havaDurumu";
import { AppStore } from "../store";
import { DEFAULT_CITY, getPosition } from "../utils";
import Header from "../components/Header/Header";


const AnaSayfa = () => {
  const dispatch = useDispatch();
  const dispatchData = (data) => dispatch(getData(data));
  const { loading } = useSelector((state: AppStore) => ({
    loading: state.data.isLoading,
  }));

  useLayoutEffect(() => {
    konumGonder();
  }, []);

  const konumGonder = useCallback(async (sehirAdi) => {
    if (!sehirAdi) {
      await getPosition()
        .then((position: GeolocationPosition) => {
          const { coords }: { coords: GeolocationCoordinates } = position;
          const { latitude: lat, longitude: lon } = coords;
          return dispatchData({ lat, lon });
        })
        .catch((err) => {
          return dispatchData(DEFAULT_CITY);
        });
    }

    return dispatchData(sehirAdi);
  }, []);

  if(loading) return <Spinner />;

  return (
    <>
      <Header />
      <Search callback={konumGonder} />
      <HavaDurumu />
      <HaftalikHavaDurumu />
    </>
  );
};

export default React.memo(AnaSayfa);
