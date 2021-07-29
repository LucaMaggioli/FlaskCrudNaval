import React from "react";
import { useNavalBattleContext } from "../../hooks/NavalBattleContextProvider";
import {
  Typography,
  Box,
  TextField,
  Button,
  CardContent,
  Card,
  CardActions,
  AppBar,
  IconButton,
  Fab,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core/styles";
import GamesDisplayer from "../GamesDisplayer";
import Chatter from "../MessagesChat/Chatter";
import { classicNameResolver } from "typescript";
import LobbyPlayers from "../LobbyPlayers";

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "80%",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: "1em",
  },
}));

export default function PlayerPage() {
  const classes = useStyles();
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
        {/* {currentEnemyPlayer !== undefined ? (
          <Card style={{ marginTop: "2em" }}>
            <CardContent>
              <Typography variant="h4" component="h2">
                {currentEnemyPlayer.nickname}
              </Typography>
              <Typography variant="body2" component="p">
                This is your enemy that you want to destroy!
              </Typography>
              <CardActions>
                <Button variant="contained" size="small" onClick={createGame}>
                  Start Game
                </Button>
                <Button variant="contained" size="small">
                  Send Message
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        ) : (
          <span></span>
        )} */}
        {/* {console.log(currentLobby.host)} */}
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
