import React from "react";

import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import Grid from "./Grid";
import { Box, Typography, Button } from "@material-ui/core";
import { GameStates } from "./Constants";

export default function FinishView() {
  const { currentGame, updateGame, currentPlayer, leaveGame } =
    useNavalBattleContext();
  const enemyPlayer =
    currentGame.player1.id === currentPlayer.id
      ? currentGame.player2
      : currentGame.player1;
  if (
    currentGame.gameState !== GameStates.PLAYER1WIN &&
    currentGame.gameState !== GameStates.PLAYER2WIN
  ) {
    updateGame();
  }

  return (
    <Box>
      <Typography
        variant="h3"
        style={{ margin: "2em 0 1em 0", textAlign: "center" }}
      >
        The winner is :
        <Typography variant="p" style={{ color: "#90F150" }}>
          {currentGame.gameState === GameStates.PLAYER1WIN
            ? " " + currentGame.player1.nickname
            : " " + currentGame.player2.nickname}
        </Typography>
      </Typography>
      <Box style={{ display: "flex", flexDirection: "row", gridGap: "6em" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gridGap: "2em",
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            style={{ wordBreak: "break-all", color: "#5385FD" }}
          >
            {currentPlayer.nickname}
          </Typography>
          <Grid cordinates={currentPlayer.grid.cordinates} />
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gridGap: "2em",
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            style={{ wordBreak: "break-all", color: "#FF5733" }}
          >
            {enemyPlayer.nickname}
          </Typography>
          <Grid cordinates={enemyPlayer.grid.cordinates} />
        </Box>
      </Box>
      <Box style={{ textAlign: "center", margin: "50px" }}>
        <Button variant="contained" onClick={leaveGame}>
          Leave the game
        </Button>
      </Box>
    </Box>
  );
}
