import React from 'react';
import styled from 'styled-components';
import { ThemeType } from '../../../theme';

interface IProps {
  status: boolean;
  callback: Function;
}

const ToggleSwitch: React.FC<IProps> = ({ status, callback }: IProps) => {
  const [toggled, setToggled] = React.useState(status);

  return (
    <Switch
      onClick={() => {
        setToggled((checked) => !checked);
        callback();
      }}
    >
      {toggled && <span className="on">C</span>}
      {!toggled && <span className="off">F</span>}
      <Slider
        style={{
          transform: toggled ? " translateX(28px)" : " translateX(0px)",
        }}
      ></Slider>
    </Switch>
  );
};

const Switch: HTMLLabelElement = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 20px;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  border-radius: 55px;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.temperatureSwitch.backgroundColor};
  .on,
  .off {
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.temperatureSwitch.textColor};
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    svg {
      width: 20px;
      fill: white;
    }
  }
  .on {
    padding-right: 15px;
  }
  .off {
    padding-left: 15px;
  }
`;
const Slider: HTMLDivElement = styled.div`
  position: absolute;
  height: 16px;
  width: 18px;
  left: 2px;
  top: 2px;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.temperatureSwitch.sliderColor};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 44px;
`;

export default ToggleSwitch;
