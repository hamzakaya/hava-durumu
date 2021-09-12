import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./app.styled";
import { darkTheme, lightTheme } from "./theme";
import AnaSayfa from "./pages/AnaSayfa";


function App() {
  const darkMode = useSelector((state: AppStore) => state.app.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AnaSayfa />
    </ThemeProvider>
  );
}

export default App
