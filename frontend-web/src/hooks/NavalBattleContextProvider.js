import React from "react";
import {
  CreateGame,
  AddPlayer,
  PlaceRandomBoats,
  SendMissile,
  StartGameVsIa,
  IASendMissile,
  UpdateGame,
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
      setCurrentPlayerId(result["id"]);
      setCurrentPlayer(result);
      history.push("/player");
    });
  }

  function startNewGame() {
    createGame().then((result) => {
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
    SendMissile(gameId, playerId, cordinate).then((result) => {
      setGameState(result["gameStatus"]);
      setCurrentPlayer(result["player"]);
    });
    if (isGameVsIa) {
      IASendMissile(gameId).then((result) => {
        setGameState(result["gameStatus"]);
        setCurrentPlayer(result["player"]);
      });
    }
  }

  function updateGame() {
    UpdateGame(currentGame.id).then((result) => setCurrentGame(result));
  }

  function stopGame() {
    history.push("/");
  }

  function startGameVsIa() {
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
    startGameVsIa,
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
