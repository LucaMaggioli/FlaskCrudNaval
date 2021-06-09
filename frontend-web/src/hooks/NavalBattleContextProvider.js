import React from "react";
import { createGame, StartGameVsIa } from "../api/game-api";
import { useHistory } from "react-router-dom";

const NavalBattleContext = React.createContext({});

export function NavalBattleContextProvider({ children }) {
  const [currentGame, setCurrentGame] = React.useState();
  const [currentPlayer, setCurrentPlayer] = React.useState();
  const history = useHistory();

  function startNewGame() {
    setCurrentGame("newGame");
    console.log("new Game");
    createGame().then((result) => {
      console.log(result);
      setCurrentGame(result);
      history.push("/game");
    });
  }

  function startNewGameVsIa(playerName) {
    console.log(playerName);
    StartGameVsIa().then((result) => {
      console.log(result);
      setCurrentGame(result);
      history.push("/game");
    });
  }

  const values = {
    currentGame,
    setCurrentGame,
    startNewGame,
    startNewGameVsIa,
    currentPlayer,
    setCurrentPlayer,
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
