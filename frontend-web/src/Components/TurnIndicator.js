import React from "react";

import { Box, Typography } from "@material-ui/core";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import { GameStates } from "./Constants";
import Loader from "react-loader-spinner";

export default function TurnIndicator() {
  const { gameState, currentPlayer, currentGame } = useNavalBattleContext();
  console.log(`gameState is ${gameState}`);
  console.log(GameStates.PLAYER1TURN);
  console.log(currentPlayer.id);
  console.log(currentGame.player1.id);

  let text = "";
  switch (gameState) {
    case GameStates.PLAYER1TURN:
      currentPlayer.id === currentGame.player1.id
        ? (text = (
            <Typography variant="h4" style={{ margin: "1em 0 1em 0" }}>
              It's your turn, come on hit that sieet !
            </Typography>
          ))
        : (text = (
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gridGap: "2em",
                margin: "2em 0 2em 0",
              }}
            >
              <Typography variant="h4">
                Waiting on the enemy (soooo slow !)
              </Typography>
              <Loader type="Grid" color="#3f51b5" height={30} width={30} />
            </Box>
          ));
      break;
    case GameStates.PLAYER2TURN:
      currentPlayer.id === currentGame.player2.id
        ? (text = (
            <Typography variant="h4" style={{ margin: "1em 0 1em 0" }}>
              It's your turn, come on hit that sieet !
            </Typography>
          ))
        : (text = (
            <Box
              style={{
                display: "flex",
                margin: "2em 0 2em 0",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gridGap: "2em",
              }}
            >
              <Typography variant="h4">
                Waiting on the enemy (soooo slow !)
              </Typography>
              <Loader type="Grid" color="#3f51b5" height={30} width={30} />
            </Box>
          ));
      break;
    case GameStates.PLAYER1WIN:
      text = "Player 1 Win !!!";
      break;
    case GameStates.PLAYER2WIN:
      text = "Player 2 Win !!!";
      break;
    default:
      text = "";
  }

  return (
    <Box
      style={{ marginTop: "5em", display: "flex", justifyContent: "center" }}
    >
      {text}
    </Box>
  );
}
