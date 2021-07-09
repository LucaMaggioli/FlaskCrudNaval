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
  console.log("Gamestate is");
  console.log(currentGame.gameState);

  if (
    currentGame.gameState !== GameStates.PLAYER1WIN &&
    currentGame.gameState !== GameStates.PLAYER2WIN
  ) {
    updateGame();
  }

  return (
    <Box>
      <h1>
        The winner is :
        <Typography variant="h3" component="h3" style={{ color: "#90F150" }}>
          {currentGame.gameState === GameStates.PLAYER1WIN
            ? " " + currentGame.player1.nickname
            : " " + currentGame.player2.nickname}
        </Typography>
        !
      </h1>
      <Box style={{ display: "flex", flexDirection: "row", gridGap: "10px" }}>
        <Box>
          <Typography
            variant="h3"
            component="h3"
            style={{ wordBreak: "break-all", color: "#5385FD" }}
          >
            {currentPlayer.nickname}'s grid :
          </Typography>
          <Grid cordinates={currentPlayer.grid.cordinates} />
        </Box>
        <Box>
          <Typography
            variant="h3"
            component="h3"
            style={{ wordBreak: "break-all", color: "#FF5733" }}
          >
            {enemyPlayer.nickname}'s grid :
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
