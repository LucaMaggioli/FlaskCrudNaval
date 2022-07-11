import React from "react";
import {
  CreateGame,
  CreateGameVsIa,
  AddPlayer,
  CreateLobby,
  PlaceRandomBoats,
  AddBoatAtPosition,
  SendMissile,
  StartGameVsIa,
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
  const [currentPlayerGames, setCurrentPlayerGames] = React.useState([]);

  const [message, setMessage] = React.useState("");

  const history = useHistory();

  const { connectSocket } = useSocketContext();
  let [amIPlayer1, setAmIPlayer1] = React.useState();

  // let connectSocket = io(`${API_URL}/connect`);

  function login(username, avatarIndex) {
    connectSocket.emit("login", username, avatarIndex);
  }

  function updateLobby() {
    connectSocket.addEventListener("updateLobby", (result) => {
      // connectSocket.on("updateLobby", (result) => {
      setCurrentPlayer(result["player"]);
      setCurrentLobby(result["lobby"]);
      setAmIPlayer1(true);
      setMessage("Lobby created succesfully");
      // window.alert("Lobby created succesfully");
    });
    connectSocket.addEventListener("updateLobbyJoiner", (result) => {
      setCurrentEnemyPlayer(result["player"]);
      setCurrentLobby(result["lobby"]);
      setMessage(`${result["player"]} joined your lobby`);
      // window.alert(`${result["player"]} joined your lobby`);
    });
    connectSocket.addEventListener("updateLobbyJoin", (result) => {
      setCurrentEnemyPlayer(result["player"]);
      setCurrentPlayer(result["lobby"]["guest"]);
      setCurrentLobby(result["lobby"]);
      setAmIPlayer1(false);
      setMessage(`you joined ${result["player"]}'s lobby !`);
      // window.alert(`you joined ${result["player"]}'s lobby !`);
    });
    connectSocket.addEventListener("createGame", (result) => {
      setCurrentGame(result);
      setGameState(result["gameState"]);
      history.push("/game");
    });
    connectSocket.addEventListener("startGame", (result) => {
      setCurrentPlayer(result["player"]);
      setGameState(result["gameState"]);
    });
    connectSocket.addEventListener("nextTurn", (result) => {
      setCurrentPlayer(result["player"]);
      setGameState(result["gameState"]);
    });
  }

  function createPlayer(playerName) {
    AddPlayer(playerName).then((result) => {
      setCurrentPlayer(result);
      getPlayerGames();
      history.push("/lobby");
    });
  }

  function createLobby(playerName) {
    let sessionId = 0;
    CreateLobby(playerName, sessionId).then((result) => {
      setCurrentPlayer(result["host"]);
      setCurrentLobby(result);
    });
  }

  function joinLobby(lobbyUrl) {
    console.log("Joining with URL");
    if (lobbyUrl !== null && lobbyUrl !== "") {
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
  function createGame() {
    CreateGame(currentLobby.host.id, currentLobby.guest.id).then(
      (result) => {}
    );
  }

  function placeRandomBoats() {
    PlaceRandomBoats(currentGame.id, currentPlayer.id).then((result) => {
      setCurrentPlayer(result);
    });
  }

  function addBoatAtPosition(boatToPlace, cellJson) {
    if (
      window.confirm(
        `Confirm place boat on cordinate 'x:${cellJson.x},y:${cellJson.y}'`
      )
    ) {
      AddBoatAtPosition(
        currentGame.id,
        currentPlayer.id,
        boatToPlace,
        cellJson
      ).then((result) => {
        if (result !== null) {
          setCurrentPlayer(result);
        }
      });
    } else {
      window.alert("Select a boat to place in that cordinate");
    }
  }

  function sendMissile(gameId, playerId, cordinate) {
    SendMissile(gameId, playerId, cordinate).then((result) => {
      setGameState(result["gameStatus"]);
      setCurrentPlayer(result["player"]);
    });
  }

  function updateGame() {
    GetUpdateGame(currentGame.id).then((result) => setCurrentGame(result));
  }

  function startGame() {
    StartGame(currentGame.id, currentPlayer.id).then((result) => {
      console.log("Waiting for other player to be ready! ");
    });
  }

  function startGameVsIa() {
    StartGameVsIa(currentGame.id).then((result) => {
      setCurrentPlayer(result);
    });
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
        console.log("games of player are:");
        console.log(result);
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
    startGame,
    amIPlayer1,
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
