import React from "react";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import { useHistory } from "react-router-dom";
import Box from "../styled-components/Box";
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
    <Box flexDirection="column" alignItems="center">
      <h1>Naval Battle {currentGame.id}</h1>
      <button onClick={leaveGame}>Leave Game</button>
      <React.Suspense fallback={<Loader />}>
        {gameState === GameStates.PLACINGBOATS ? (
          <PlaceBoat />
        ) : gameState === GameStates.PLAYER1WIN ||
          gameState === GameStates.PLAYER2WIN ? (
          <FinishView />
        ) : gameState === GameStates.PLAYER1TURN || GameStates.PLAYER2TURN ? (
          <GameView />
        ) : (
          <h2>waiting</h2>
        )}
      </React.Suspense>
    </Box>
  );
}
