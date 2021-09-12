import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./app.styled";
import { darkTheme, lightTheme } from "./theme";
import Anasayfa from "./pages/Anasayfa";


function App() {
  const darkMode = useSelector((state: AppStore) => state.app.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Anasayfa />
    </ThemeProvider>
  );
}

export default App
