import React from "react";
import { useNavalBattleContext } from "../../hooks/NavalBattleContextProvider";
import { Typography, Box, Button } from "@material-ui/core";
import GamesDisplayer from "../GamesDisplayer";
import Chatter from "../MessagesChat/Chatter";

export default function PlayerPage() {
  const { createGame, currentPlayer, currentPlayerGames, getPlayerGames } =
    useNavalBattleContext();

  React.useEffect(() => {
    getPlayerGames();
  }, [currentPlayer]);

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
          <Button variant="contained" style={{ width: "30%" }}>
            Invite Friend (todo)
          </Button>
          <Button variant="contained" style={{ width: "30%" }}>
            Join Friend Lobby (todo)
          </Button>
        </Box>
        <GamesDisplayer games={currentPlayerGames} />
        <Chatter />
      </Box>
    </Box>
  );
}
