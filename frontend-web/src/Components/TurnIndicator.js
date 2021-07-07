import { Box } from "@material-ui/core";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import { GameStatuses } from "./Constants";

export default function TurnIndicator() {
  const { gameState } = useNavalBattleContext();

  let text = "text";
  switch (gameState) {
    case GameStatuses.PLAYER1TURN:
      text = "It's player 1 turn !";
      break;
    case GameStatuses.PLAYER2TURN:
      text = "It's player 2 turn !";
      break;
    case GameStatuses.PLAYER1WIN:
      text = "Player 1 Win !!!";
      break;
    case GameStatuses.PLAYER2WIN:
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
