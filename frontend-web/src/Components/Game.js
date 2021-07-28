import React from "react";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import { useHistory } from "react-router-dom";
import { Typography, Box, Button } from "@material-ui/core";
import { GameStates } from "./Constants";

import Loader from "../Loader";

import PlaceBoat from "./PlaceBoat";
import GameView from "./GameView";
import FinishView from "./FinishView";

export default function Game() {
  const { currentGame, leaveGame, gameState } = useNavalBattleContext();
  const history = useHistory();

  if (!currentGame || !currentGame.gameState) {
    history.push("/");
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "1em",
        }}
      >
        <Typography variant="h2">Naval Battle {currentGame.name}</Typography>
        <Button
          style={{ width: "12em", marginTop: "2em" }}
          variant="contained"
          onClick={leaveGame}
        >
          Leave Game
        </Button>
      </Box>
      <React.Suspense fallback={<Loader />}>
        {gameState === GameStates.PLACINGBOATS ? (
          <PlaceBoat />
        ) : gameState === GameStates.PLAYER1WIN ||
          gameState === GameStates.PLAYER2WIN ? (
          <FinishView />
        ) : gameState === GameStates.PLAYER1TURN || GameStates.PLAYER2TURN ? (
          <GameView />
        ) : (
          <Typography variant="h2">waiting</Typography>
        )}
      </React.Suspense>
    </Box>
  );
}
