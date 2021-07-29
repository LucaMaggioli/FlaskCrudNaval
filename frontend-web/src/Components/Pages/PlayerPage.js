import React from "react";
import { useNavalBattleContext } from "../../hooks/NavalBattleContextProvider";
import { Typography, Box, TextField, Button } from "@material-ui/core";

import Chatter from "../MessagesChat/Chatter";
import LobbyPlayers from "../LobbyPlayers";

export default function PlayerPage() {
  const {
    createGameVsIa,
    currentLobby,
    currentPlayer,
    currentEnemyPlayer,
    currentPlayerGames,
    joinLobby,
    updateLobby,
    currentGame,
    createGame,
  } = useNavalBattleContext();
  const [lobbyUrlToJoin, setLobbyUrnToJoin] = React.useState("");

  React.useEffect(() => {
    updateLobby();
  }, [currentPlayer, currentLobby, currentGame]);

  updateLobby();

  return (
    <Box>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h2" style={{ marginBottom: "1em" }}>
          Welcome to{" "}
          {currentPlayer["lobbyOwner"]
            ? currentPlayer["nickname"]
            : currentEnemyPlayer["nickname"]}
          's Lobby !
        </Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            gridGap: "5px",
          }}
        >
          <Button
            variant="contained"
            style={{ width: "30%" }}
            onClick={() => {
              createGameVsIa(currentPlayer["id"]);
            }}
          >
            Play vs Ia
          </Button>
          <Typography
            variant="body1"
            style={{
              width: "30%",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Invite URL: {currentLobby.url}
          </Typography>
          <Box style={{ display: "flex", flexDirection: "row", width: "30%" }}>
            <TextField
              variant="outlined"
              label="Lobby Url"
              onChange={(e) => {
                setLobbyUrnToJoin(e.target.value);
              }}
            ></TextField>
            <Button variant="contained" onClick={joinLobby(lobbyUrlToJoin)}>
              Join
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <LobbyPlayers lobby={currentLobby} currentPlayer={currentPlayer} />
          <Button
            variant="contained"
            onClick={createGame}
            style={{
              marginLeft: "10em",
              height: "4em",
              display: currentLobby.guest.id !== -1 ? "flex" : "none",
            }}
          >
            Start Game
          </Button>
        </Box>
        {/* <GamesDisplayer games={currentPlayerGames} /> */}
        <Chatter />
      </Box>
    </Box>
  );
}
