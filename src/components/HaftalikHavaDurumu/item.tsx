import React from "react";
import Derece from "../HavaDurumu/Derece";
import Icon from "../ui/Icon";
import { ItemContainer } from "./styled";

interface IForecastItemProps {
  day: string;
  weatherCode: number;
  high: number;
  low: number;
  description: string;
}
const ForecastItem: React.FC<IForecastItemProps> = ({
  day,
  weatherCode,
  description,
  high,
  low,
}) => {
  return (
    <ItemContainer>
      <h6>{day}</h6>
      <Icon code={weatherCode} />
      <p>{description}</p>
      <span>
        <Derece value={high} />
        <sup>&deg;</sup>
        <small>/</small>
        <Derece value={low} />
        <sup>&deg;</sup>
      </span>
    </ItemContainer>
  );
};

export default ForecastItem;
