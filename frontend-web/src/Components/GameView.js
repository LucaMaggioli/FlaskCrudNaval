import React from "react";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import Grid from "./Grid";
import TurnIndicator from "./TurnIndicator";
import { Box } from "@material-ui/core";
import { GameStates } from "../services/GameService";

export default function GameView() {
  const { currentGame, sendMissile, currentPlayer, amIPlayer1, gameState } =
    useNavalBattleContext();

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

    // if (gameState === GameStates.PLAYER1_TURN) {
    //   amIPlayer1
    //     ? sendMissile(currentGame.id, currentPlayer.id, cordinate)
    //     : window.alert("it's not your turn !");
    // } else {
    //   !amIPlayer1
    //     ? sendMissile(currentGame.id, currentPlayer.id, cordinate)
    //     : window.alert("it's not your turn !");
    // }
  }

  return (
    <Box>
      <Box>
        <TurnIndicator />
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", gridGap: "20px" }}>
        <div>
          <h2>Grille du joueur</h2>
          <Grid cordinates={grid.cordinates} />
        </div>
        <div>
          <h2>Grille de l'adversaire</h2>
          <Grid
            cordinates={gridPlay.cordinates}
            onCellClick={(cordinate) => sendMissileToEnemy(cordinate)}
          />
        </div>
      </Box>
    </Box>
  );
}
