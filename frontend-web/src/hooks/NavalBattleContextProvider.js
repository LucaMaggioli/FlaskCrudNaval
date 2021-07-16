import React, { useEffect } from "react";
import {
  CreateGame,
  AddPlayer,
  CreateLobby,
  CreateLobbySocket,
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
    connectSocket.addEventListener("updateLobby", (result) => {
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
  }

  function createPlayer(playerName) {
    AddPlayer(playerName).then((result) => {
      setCurrentPlayerId(result["id"]);
      setCurrentPlayer(result);
      getPlayerGames();
      history.push("/player");
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
    getPlayerGames();
    history.push("/player");
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
    createGame,
    createPlayer,
    setCurrentPlayer,
    setCurrentEnemyPlayer,
    placeRandomBoats,
    sendMissile,
    startGameVsIa,
    updateGame,
    leaveGame,
    getPlayerGames,
    createLobby,
    joinLobby,
    login,
    updateLobby,
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
