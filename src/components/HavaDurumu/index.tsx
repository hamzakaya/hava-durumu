import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../store/store";
import { changeDereceTip } from "../../store/reducers/app";
import ToggleSwitch from "../ui/ToggleSwitch/ToggleSwitch";
import Icon from "../ui/Icon";
import {
  Detay,
  CurrentContainer,
  InfoTablo,
  FeelsLike,
  HighLowContainer,
  InfoRow,
  SectionTitle,
  Container,
  Degree,
} from "./styled";
import HighIcon from "../../assets/high-icon.svg?component";
import HumidityIcon from "../../assets/humidity-icon.svg?component";
import LowIcon from "../../assets/low-icon.svg?component";
import PressureIcon from "../../assets/pressure-icon.svg?component";
import WindIcon from "../../assets/wind-icon.svg?component";

import Derece from "./Derece";
import { kmToMile, DereceTip } from "../../utils";
import { havaDurumuDetay } from "../../store/reducers/havadurumu";

const HavaDurumu: React.FC = () => {
  const dispatch = useDispatch();
  const { weather, dereceTipi, recieved, isLoading } =
    useSelector(havaDurumuDetay);

  if (isLoading || !recieved) return null;

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SectionTitle>Bugün İçin Hava Tahmini</SectionTitle>
        <div>
          <ToggleSwitch
            status={dereceTipi}
            callback={() => dispatch(changeDereceTip())}
          />
        </div>
      </div>

      <CurrentContainer>
        <Detay>
          <h4>{weather.name}</h4>
          <div style={{ display: "flex" }}>
            <Icon code={weather.weather?.id} big />
            <span>
              <Derece value={weather.main.temp} />
              <sup>&deg;</sup>
            </span>
          </div>
          <h6>{weather.weather?.description}</h6>
        </Detay>

        <InfoTablo>
          <FeelsLike>
            Hissedilen <Derece value={weather.main.feels_like} />
            <sup>&deg;</sup>
          </FeelsLike>
          <HighLowContainer>
            <Degree>
              <HighIcon />
              <Derece value={weather.main.temp_max} />
              <sup>&deg;</sup>
            </Degree>
            <Degree>
              <LowIcon />
              <Derece value={weather.main.temp_min} />
              <sup>&deg;</sup>
            </Degree>
          </HighLowContainer>
          <InfoRow>
            <div>
              <HumidityIcon /> Nem
            </div>
            <span>{weather.main.humidity}%</span>
          </InfoRow>
          <InfoRow>
            <div>
              <WindIcon /> Rüzgar
            </div>
            <span>
              {dereceTipi === DereceTip.CELCIUS
                ? weather?.wind?.speed
                : kmToMile(weather?.wind?.speed)}
              {dereceTipi === DereceTip.CELCIUS ? " kph" : " mph"}
            </span>
          </InfoRow>
          <InfoRow>
            <div>
              <PressureIcon /> Basınç
            </div>
            <span>{weather.main.pressure} hPa</span>
          </InfoRow>
        </InfoTablo>
      </CurrentContainer>
    </Container>
  );
};

export default React.memo(HavaDurumu);
