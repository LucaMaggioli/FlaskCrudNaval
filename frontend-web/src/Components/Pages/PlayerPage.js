import React from "react";
import { useNavalBattleContext } from "../../hooks/NavalBattleContextProvider";
import { Box, Button } from "@material-ui/core";
import GamesDisplayer from "../GamesDisplayer";

export default function PlayerPage() {
  const { createGame, currentPlayer, currentPlayerGames, getPlayerGames } =
    useNavalBattleContext();

  React.useEffect(() => {
    getPlayerGames();
  }, [currentPlayer]);

  return (
    <>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <h1>Welcome to your lobby {currentPlayer["nickname"]} !</h1>
        <Box style={{ display: "flex", flexDirection: "row", gridGap: "5px" }}>
          <Button
            variant="contained"
            onClick={() => {
              createGame(currentPlayer["id"]);
            }}
          >
            Play vs Ia
          </Button>
          <Button variant="contained">Invite Friend (todo)</Button>
        </Box>
        <GamesDisplayer games={currentPlayerGames} />
      </Box>
    </>
  );
}
