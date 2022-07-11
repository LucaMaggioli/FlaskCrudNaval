import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Routes from "./Routes";
import { NavalBattleContextProvider } from "./hooks/NavalBattleContextProvider";
import { SocketContextProvider } from "./hooks/SocketContextProvider";
import { Box } from "@material-ui/core";

import "@fontsource/roboto";

const theme = {
  textPrimary: "#ffffff",
  textSecondary: "rgba(255,255,255,0.6)",
  primary: { main: "rgba(51,113,255,1)", light: "rgba(51,113,255,0.5)" },
  secondary: { main: "#6c5ce7", light: "rgba(108,92,231,0.5)" },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SocketContextProvider>
          <NavalBattleContextProvider>
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <Box justifyContent="center" style={{ marginTop: "5em" }}>
                <Routes />
              </Box>
            </Box>
          </NavalBattleContextProvider>
        </SocketContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
