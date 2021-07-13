import React from "react";
import {
  CreateGame,
  AddPlayer,
  CreateLobby,
  PlaceRandomBoats,
  SendMissile,
  StartGameVsIa,
  IASendMissile,
  UpdateGame as GetUpdateGame,
  LeaveGame,
  GetPlayerGames,
} from "../api/game-api";
import { useHistory } from "react-router-dom";
import { GameStates } from "../services/GameService";

const NavalBattleContext = React.createContext({});

export function NavalBattleContextProvider({ children }) {
  const [currentGame, setCurrentGame] = React.useState();
  const [currentPlayer, setCurrentPlayer] = React.useState();
  const [currentLobby, setCurrentLobby] = React.useState();
  const [gameState, setGameState] = React.useState();
  const [isGameVsIa, setIsGameVsIa] = React.useState(false);
  const [currentPlayerGames, setCurrentPlayerGames] = React.useState([]);

  const [currentPlayerId, setCurrentPlayerId] = React.useState(-1);
  const history = useHistory();

  function createPlayer(playerName) {
    AddPlayer(playerName).then((result) => {
      setCurrentPlayerId(result["id"]);
      setCurrentPlayer(result);
      history.push("/player");
    });
    // createLobby();
  }

  function createLobby(playerName) {
    console.log(`Playername is: ${playerName}`);
    CreateLobby(playerName).then((result) => {
      console.log(`result afte api call is:`);
      console.log(result);
      setCurrentPlayer(result["host"]);
      setCurrentLobby(result);
      console.log(
        `so currentplayer :${currentPlayer} and lobby: ${currentLobby}`
      );
      console.log(currentPlayer);
      console.log(currentLobby);
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
    GetUpdateGame(currentGame.id).then((result) => setCurrentGame(result));
  }

  function startGameVsIa() {
    StartGameVsIa(currentGame.id).then((result) => {
      setCurrentPlayer(result);
    });
    setIsGameVsIa(true);
    setGameState(GameStates.PLAYER1_TURN);
  }

  function leaveGame() {
    LeaveGame(currentGame.id, currentPlayer.id).then((result) => {
      setCurrentPlayer(result);
    });
    history.push("/player");
  }

  function getPlayerGames() {
    GetPlayerGames(currentPlayer.id).then((result) => {
      setCurrentPlayerGames(result);
    });
  }

  const values = {
    currentGame,
    currentPlayer,
    currentLobby,
    currentPlayerGames,
    gameState,
    history,
    setGameState,
    setCurrentGame,
    startNewGame,
    createGame,
    createPlayer,
    setCurrentPlayer,
    placeRandomBoats,
    sendMissile,
    startGameVsIa,
    updateGame,
    leaveGame,
    getPlayerGames,
    createLobby,
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
