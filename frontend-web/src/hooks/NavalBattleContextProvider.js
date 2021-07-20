import React, { useEffect } from "react";
import {
  CreateGame,
  CreateGameVsIa,
  AddPlayer,
  CreateLobby,
  CreateLobbySocket,
  PlaceRandomBoats,
  AddBoatAtPosition,
  SendMissile,
  StartGameVsIa,
  IASendMissile,
  UpdateGame as GetUpdateGame,
  LeaveGame,
  GetPlayerGames,
  StartGame,
} from "../api/game-api";
import { useHistory } from "react-router-dom";
import { GameStates } from "../services/GameService";
import { useSocketContext } from "../hooks/SocketContextProvider";

const NavalBattleContext = React.createContext({});

export function NavalBattleContextProvider({ children }) {
  const [currentGame, setCurrentGame] = React.useState();
  const [currentPlayer, setCurrentPlayer] = React.useState();
  const [currentEnemyPlayer, setCurrentEnemyPlayer] = React.useState();
  const [currentLobby, setCurrentLobby] = React.useState();
  const [gameState, setGameState] = React.useState();
  const [isGameVsIa, setIsGameVsIa] = React.useState(false);
  const [currentPlayerGames, setCurrentPlayerGames] = React.useState([]);

  const [message, setMessage] = React.useState("");

  const [currentPlayerId, setCurrentPlayerId] = React.useState(-1);
  const history = useHistory();

  const { connectSocket } = useSocketContext();

  // let connectSocket = io(`${API_URL}/connect`);

  function login(username) {
    connectSocket.emit("login", username);
  }

  function updateLobby() {
    connectSocket.on("updateLobby", (result) => {
      // connectSocket.on("updateLobby", (result) => {
      console.log("receiving a lobby Update, You create your Lobby");
      console.log(result);
      setCurrentPlayer(result["player"]);
      setCurrentLobby(result["lobby"]);
      setMessage("Lobby created succesfully");
      // window.alert("Lobby created succesfully");
    });
    connectSocket.addEventListener("updateLobbyJoiner", (result) => {
      console.log("receiving a lobby Update, someoneJoin Your Lobby");
      console.log(result);
      setCurrentEnemyPlayer(result["player"]);
      setCurrentLobby(result["lobby"]);
      setMessage(`${result["player"]} joined your lobby`);
      // window.alert(`${result["player"]} joined your lobby`);
    });
    connectSocket.addEventListener("updateLobbyJoin", (result) => {
      console.log("receiving a lobby Update, you join a Lobby");
      console.log(result);
      setCurrentEnemyPlayer(result["player"]);
      setCurrentPlayer(result["lobby"]["guest"]);
      setCurrentLobby(result["lobby"]);
      setMessage(`you joined ${result["player"]}'s lobby !`);
      // window.alert(`you joined ${result["player"]}'s lobby !`);
    });
    connectSocket.addEventListener("createGame", (result) => {
      console.log("receiving a creation of the game, redirect to Game page!");
      console.log("game is : ");
      console.log(result);
      setCurrentGame(result);
      setGameState(result["gameState"]);
      history.push("/game");
    });
  }

  function createPlayer(playerName) {
    AddPlayer(playerName).then((result) => {
      setCurrentPlayerId(result["id"]);
      setCurrentPlayer(result);
      getPlayerGames();
      history.push("/lobby");
    });
    // createLobby();
  }

  function createLobby(playerName) {
    // console.log(`Playername is: ${playerName}`);
    // socket.emit("createLobby", playerName);
    let sessionId = 0;
    CreateLobby(playerName, sessionId).then((result) => {
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

  function joinLobby(lobbyUrl) {
    console.log("Joining with URL");
    if (lobbyUrl !== null && lobbyUrl !== "") {
      console.log(`Joining lobby with url ${lobbyUrl}`);
      connectSocket.emit("joinLobby", currentPlayer.id, lobbyUrl);
    }
  }

  function startNewGame() {
    createGameVsIa().then((result) => {
      setCurrentGame(result);
      history.push("/game");
    });
  }

  function createGameVsIa(playerId) {
    CreateGameVsIa(playerId).then((result) => {
      setCurrentGame(result);
      setGameState(GameStates.PLACE_BOAT);
      history.push("/game");
    });
  }
  // currentLobby["player1"]["id"],
  // currentLobby["player2"]["id"]
  // function createGame(player1Id, player2Id) {
  function createGame() {
    console.log(currentLobby);
    // CreateGame(player1Id, player2Id).then((result) => console.log(result));
    CreateGame(currentLobby.host.id, currentLobby.guest.id).then((result) => {
      console.log("after create game");
      console.log(result);
    });
  }

  function placeRandomBoats() {
    PlaceRandomBoats(currentGame.id, currentPlayer.id).then((result) => {
      // setCurrentGame(result);
      setCurrentPlayer(result);
    });
  }

  function addBoatAtPosition(boatToPlace, cellJson) {
    AddBoatAtPosition(
      currentGame.id,
      currentPlayer.id,
      cellJson,
      boatToPlace
    ).then((result) => {
      console.log(result);
      setCurrentPlayer(result);
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

  function startGame() {
    StartGame(currentPlayer.id).then((result) => {
      setCurrentGame(result);
    });
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
    getPlayerGames();
    history.push("/lobby");
  }

  function getPlayerGames() {
    GetPlayerGames(currentPlayer.id).then((result) => {
      if (result.lenght !== currentPlayerGames.lenght) {
        setCurrentPlayerGames(result);
      }
    });
  }

  const values = {
    currentGame,
    currentPlayer,
    currentEnemyPlayer,
    currentLobby,
    currentPlayerGames,
    gameState,
    history,
    setGameState,
    setCurrentGame,
    startNewGame,
    createGameVsIa,
    createPlayer,
    setCurrentPlayer,
    setCurrentEnemyPlayer,
    placeRandomBoats,
    addBoatAtPosition,
    sendMissile,
    startGameVsIa,
    updateGame,
    leaveGame,
    getPlayerGames,
    createLobby,
    joinLobby,
    login,
    updateLobby,
    createGame,
    message,
    setMessage,
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
