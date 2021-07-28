import React from "react";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import Grid from "./Grid";
import TurnIndicator from "./TurnIndicator";
import { Box, Typography } from "@material-ui/core";
import { GameStates } from "../services/GameService";

export default function GameView() {
  const { currentGame, sendMissile, currentPlayer, gameState } =
    useNavalBattleContext();

  let statusOfGame = gameState;
  console.log(`statusOfGame is ${statusOfGame}`);

  let grid = currentPlayer.grid;
  let gridPlay = currentPlayer.gridPlay;

  function sendMissileToEnemy(cordinate) {
    if (gameState === GameStates.PLAYER1_TURN && currentPlayer.lobbyOwner) {
      sendMissile(currentGame.id, currentPlayer.id, cordinate);
    } else if (
      gameState === GameStates.PLAYER2_TURN &&
      !currentPlayer.lobbyOwner
    ) {
      sendMissile(currentGame.id, currentPlayer.id, cordinate);
    } else {
      window.alert("It's not your turn!");
    }
  }

  return (
    <Box>
      <Box>
        <TurnIndicator
          currentGameP1={currentGame.player1}
          currentPlayer={currentPlayer}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          gridGap: "6em",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gridGap: "1em",
          }}
        >
          <Typography variant="h3">Your Grid</Typography>
          <Grid cordinates={grid.cordinates} />
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gridGap: "1em",
          }}
        >
          <Typography variant="h3">Enemy Grid</Typography>
          <Grid
            cordinates={gridPlay.cordinates}
            onCellClick={(cordinate) => sendMissileToEnemy(cordinate)}
          />
        </Box>
      </Box>
    </Box>
  );
}
