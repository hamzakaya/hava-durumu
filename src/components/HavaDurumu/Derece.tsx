import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../store/store";
import { celciusToFahrenheit, DereceTip } from "../../utils";

interface IProps {
  value: number;
}

const DereceComponent: React.FC<IProps> = ({ value }) => {
  const { dereceTipi } = useSelector((state: AppStore) => ({
    dereceTipi: state.app.dereceTipi,
  }));

  if (dereceTipi === DereceTip.FAHRENHEIT) return <>{celciusToFahrenheit(value)}</>;
  return <>{value}</>;
};

export default DereceComponent;
