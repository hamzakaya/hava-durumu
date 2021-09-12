import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../store/reducers/havadurumu";
import { AppStore } from "../store";
import { DEFAULT_CITY, getPosition } from "../utils";
import {
  Header,
  Search,
  HavaDurumu,
  HaftalikHavaDurumu,
  Spinner,
} from "../components";

const Anasayfa = () => {
  const dispatch = useDispatch();
  const dispatchData = (data) => dispatch(getData(data));
  const { loading, isError } = useSelector((state: AppStore) => ({
    loading: state.data.isLoading,
    isError: state.data.isError,
  }));

  useLayoutEffect(() => {
    if (!isError) konumGonder();
  }, []);

  const konumGonder = useCallback(async (sehirAdi) => {
    if (!sehirAdi) {
      return await getPosition()
        .then(({ coords: { latitude: lat, longitude: lon } }) =>
          dispatchData({ lat, lon })
        )
        .catch((err) => {
          dispatchData(DEFAULT_CITY);
        });
    }

    return dispatchData(sehirAdi);
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <Header />
      <Search callback={konumGonder} />

      {!isError && (
        <>
          <HavaDurumu />
          <HaftalikHavaDurumu />
        </>
      )}
      
    </>
  );
};

export default Anasayfa;
