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
} from "@material-ui/core";
import GamesDisplayer from "../GamesDisplayer";
import Chatter from "../MessagesChat/Chatter";

export default function PlayerPage() {
  // _isMounted = false;
  const {
    createGame,
    currentLobby,
    currentPlayer,
    currentEnemyPlayer,
    currentPlayerGames,
    getPlayerGames,
    joinLobby,
    updateLobby,
  } = useNavalBattleContext();

  React.useEffect(() => {
    getPlayerGames();
    updateLobby();
  }, [currentPlayer, currentLobby]);

  // currentPlayer["lobbyOwner"] ? updateLobbyHost() : updateLobbyGuest();
  updateLobby();

  const [lobbyUrlToJoin, setLobbyUrnToJoin] = React.useState("");

  // componentDidMount(){
  //   this._isMounted = true;

  // }

  return (
    <Box>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h2" style={{ marginBottom: "1em" }}>
          Welcome to your lobby {currentPlayer["nickname"]} !
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
              createGame(currentPlayer["id"]);
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
        {currentEnemyPlayer ? (
          <Card style={{ marginTop: "2em" }}>
            <CardContent>
              <Typography variant="h4" component="h2">
                {currentEnemyPlayer.nickname}
              </Typography>
              <Typography variant="body2" component="p">
                This is your enemy that you want to destroy!
              </Typography>
              <CardActions>
                <Button variant="contained" size="small">
                  Start Game
                </Button>
                <Button variant="contained" size="small">
                  Send Message
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        ) : null}
        <GamesDisplayer games={currentPlayerGames} />
        <Chatter />
      </Box>
    </Box>
  );
}
