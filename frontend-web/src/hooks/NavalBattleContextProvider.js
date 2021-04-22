import React, { useEffect } from "react";
// import useLocalStorageState from "./useLocalStorageState";
// import { createGame, getGame, updateGameState } from "../api/game-api";
// import { gameParser } from "../utils/gameParser";
// import { useHistory } from "react-router-dom";

const NavalBattleContext = React.createContext({});

export function NavalBattleContextProvider({ children }) {
  const [currentGame, setCurrentGame] = React.useState();

  function startNewGame() {
    setCurrentGame("newGame");
  }

  const values = {
    currentGame,
  };
  return (
    <NavalBattleContext.Provider value={values}>
      {children}
    </NavalBattleContext.Provider>
  );
}

export function useNavalBattleContext() {
  const context = React.useContext(NavalBattleContext);
  if (!context)
    throw new Error(
      "useNavalBattleContext should be used within a NavalBattleContextProvider"
    );
  return context;
}
