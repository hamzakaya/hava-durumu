import React from "react";
import GithubIcon from "../../assets/github.svg?component";
import {
  GithubLink,
  HeaderContainer,
  Title,
  HeaderIconsContainer,
} from "./styed";
import { useDispatch, useSelector } from "react-redux";
import DarkModeToggle from "react-dark-mode-toggle";
import { AppStore } from "../../store";
import { toggleDarkMode } from "../../store/reducers/app";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: AppStore) => state.app.darkMode);

  return (
    <HeaderContainer>
      <Title>
        <b>React</b> \ Hava Durumu
      </Title>
      <HeaderIconsContainer>
        <DarkModeToggle
          checked={isDarkMode}
          onChange={() => dispatch(toggleDarkMode())}
          size={60}
        />
        <GithubLink href="http://github.com/hamzakaya/hava-durumu">
          <GithubIcon />
        </GithubLink>
      </HeaderIconsContainer>
    </HeaderContainer>
  );
};

export default Header;
