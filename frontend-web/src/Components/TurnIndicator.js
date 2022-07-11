import React from "react";

import { Box, Typography } from "@material-ui/core";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import { GameStates } from "./Constants";
import Loader from "react-loader-spinner";

export default function TurnIndicator() {
  const { gameState, currentPlayer, currentGame } = useNavalBattleContext();

  let itsYourTurn = (
    <Typography variant="h4" style={{ margin: "1em 0 2em 0" }}>
      It's your turn, come on hit that sieet !
    </Typography>
  );
  let itsEnemyTurn = (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gridGap: "2em",
        margin: "1em 0 2em 0",
      }}
    >
      <Typography variant="h4">Waiting on the enemy (soooo slow !)</Typography>
      <Loader type="Grid" color="#3f51b5" height={30} width={30} />
    </Box>
  );

  let turnMessage = "";
  switch (gameState) {
    case GameStates.PLAYER1TURN:
      currentPlayer.id === currentGame.player1.id
        ? (turnMessage = itsYourTurn)
        : (turnMessage = itsEnemyTurn);
      break;
    case GameStates.PLAYER2TURN:
      currentPlayer.id === currentGame.player2.id
        ? (turnMessage = itsYourTurn)
        : (turnMessage = itsEnemyTurn);
      break;
    case GameStates.PLAYER1WIN:
      turnMessage = "Player 1 Win !!!";
      break;
    case GameStates.PLAYER2WIN:
      turnMessage = "Player 2 Win !!!";
      break;
    default:
      turnMessage = "";
  }

  return (
    <Box
      style={{ marginTop: "5em", display: "flex", justifyContent: "center" }}
    >
      {turnMessage}
    </Box>
  );
}
