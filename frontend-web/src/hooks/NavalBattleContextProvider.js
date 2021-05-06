import React, { useEffect } from "react";
import { createGame } from "../api/game-api";
import { useHistory } from "react-router-dom";

const NavalBattleContext = React.createContext({});

export function NavalBattleContextProvider({ children }) {
  const [currentGame, setCurrentGame] = React.useState();
  const [currentBoat, setCurrentBoat] = React.useState([]);
  const [currentGameId, setCurrentGameId] = React.useState();
  const history = useHistory();

  function startNewGame() {
    setCurrentGame("newGame");
    console.log("new Game");
    createGame().then((result) => {
      console.log(result);
      setCurrentGameId(result.id);
      setCurrentGame(result);
      history.push("/game");
    });
  }

  const values = {
    currentGame,
    currentGameId,
    currentBoat,
    setCurrentBoat,
    startNewGame,
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
