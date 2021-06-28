import React from "react";
import {
  CreateGame,
  AddPlayer,
  PlaceRandomBoats,
  SendMissile,
  StartGameVsIa,
  IASendMissile,
} from "../api/game-api";
import { useHistory } from "react-router-dom";
import { GameStates } from "../services/GameService";

const NavalBattleContext = React.createContext({});

export function NavalBattleContextProvider({ children }) {
  const [currentGame, setCurrentGame] = React.useState();
  const [currentPlayer, setCurrentPlayer] = React.useState();
  const [gameState, setGameState] = React.useState();
  const [isGameVsIa, setIsGameVsIa] = React.useState(false);

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
    createGame().then((result) => {
      console.log(result);
      setCurrentGame(result);
      history.push("/game");
    });
  }

  function createGame(playerId) {
    CreateGame(playerId).then((result) => {
      setCurrentGame(result);
      setGameState(GameStates.PLACE_BOAT);
      history.push("/game");
    });
  }

  function placeRandomBoats() {
    PlaceRandomBoats(currentGame.id, currentPlayer.id).then((result) => {
      setCurrentGame(result);
    });
  }

  function sendMissile(gameId, playerId, cordinate) {
    console.log(gameId);
    console.log(playerId);
    console.log(cordinate);
    SendMissile(gameId, playerId, cordinate).then((result) => {
      setGameState(result["gameStatus"]);
      setCurrentPlayer(result["player"]);
      console.log("gameStatUS IS  ");
      console.log(gameState);
    });
    console.log("missile sent");
    console.log(`isGameVsIa ? ${isGameVsIa}`);
    if (isGameVsIa) {
      IASendMissile(gameId).then((result) => {
        setGameState(result["gameStatus"]);
        setCurrentPlayer(result["player"]);
      });
    }
  }

  function stopGame() {
    //TODO call and endpoint to set the status of the game at FINISHED
    history.push("/");
  }

  function playVsIa() {
    StartGameVsIa(currentGame.id).then((result) => {
      setCurrentPlayer(result);
    });
    setIsGameVsIa(true);
    setGameState(GameStates.PLAYER1_TURN);
  }

  const values = {
    currentGame,
    currentPlayer,
    gameState,
    setGameState,
    setCurrentGame,
    startNewGame,
    createGame,
    createPlayer,
    setCurrentPlayer,
    placeRandomBoats,
    sendMissile,
    stopGame,
    playVsIa,
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
