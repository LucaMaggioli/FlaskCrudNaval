import React from "react";
import {
  createGame,
  StartGameVsIa,
  AddPlayer,
  PlaceRandomBoats,
} from "../api/game-api";
import { useHistory } from "react-router-dom";

const NavalBattleContext = React.createContext({});

export function NavalBattleContextProvider({ children }) {
  const [currentGame, setCurrentGame] = React.useState();
  const [currentPlayer, setCurrentPlayer] = React.useState();
  const [currentPlayerId, setCurrentPlayerId] = React.useState(-1);
  const history = useHistory();

  function createPlayer(playerName) {
    AddPlayer(playerName).then((result) => {
      console.log("result from backend after adding player is:");
      console.log(result);
      console.log("new player ID is:");
      console.log(result.playerId);
      setCurrentPlayerId(result["id"]);
      console.log("currentPlayer ID is");
      console.log(currentPlayerId);
      setCurrentPlayer(result);
      console.log("currentPlayer is");
      console.log(currentPlayer);
      history.push("/player");
    });
  }

  function startNewGame() {
    setCurrentGame("newGame");
    createGame().then((result) => {
      console.log(result);
      setCurrentGame(result);
      history.push("/game");
    });
  }

  function startNewGameVsIa(playerId) {
    StartGameVsIa(playerId).then((result) => {
      console.log(result);
      setCurrentGame(result);
      history.push("/game");
    });
  }

  function placeRandomBoats() {
    PlaceRandomBoats(currentGame.id, currentPlayer.id).then((result) => {
      setCurrentGame(result);
      console.log("new Game is ");
      console.log(currentGame);
    });
  }

  const values = {
    currentGame,
    setCurrentGame,
    startNewGame,
    startNewGameVsIa,
    createPlayer,
    currentPlayer,
    setCurrentPlayer,
    placeRandomBoats,
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
