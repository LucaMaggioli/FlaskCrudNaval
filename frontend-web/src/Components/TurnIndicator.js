import React from "react";

import { Box } from "@material-ui/core";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import { GameStates } from "./Constants";

export default function TurnIndicator() {
  const { gameState } = useNavalBattleContext();

  let text = "text";
  switch (gameState) {
    case GameStates.PLAYER1TURN:
      text = "It's player 1 turn !";
      break;
    case GameStates.PLAYER2TURN:
      text = "It's player 2 turn !";
      break;
    case GameStates.PLAYER1WIN:
      text = "Player 1 Win !!!";
      break;
    case GameStates.PLAYER2WIN:
      text = "Player 2 Win !!!";
      break;
    default:
    // code block in case
  }

  return (
    <Box>
      <h1>Player turn indicator ^.^</h1>
      <h2>{gameState}</h2>
      <h2>{text}</h2>
    </Box>
  );
}
