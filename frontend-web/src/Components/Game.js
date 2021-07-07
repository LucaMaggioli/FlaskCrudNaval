import React from "react";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import { useHistory } from "react-router-dom";
import Box from "../styled-components/Box";
import { GameStatuses } from "./Constants";

import Loader from "../Loader";

const PlaceBoat = React.lazy(() =>
  import(/* webpackChunkName: "PlaceBoat" */ "./PlaceBoat")
);

const GameView = React.lazy(() =>
  import(/* webpackChunkName: "PlaceBoat" */ "./GameView")
);

export default function Game() {
  const { currentGame, stopGame, gameState } = useNavalBattleContext();
  const history = useHistory();

  console.log(`gameState in game = ${gameState}`);

  if (!currentGame || !currentGame.gameState) {
    history.push("/");
    return null;
  }

  return (
    <Box flexDirection="column" alignItems="center">
      <h1>Naval Battle {currentGame.id}</h1>
      <button onClick={stopGame}>Stop</button>
      <React.Suspense fallback={<Loader />}>
        {gameState === GameStatuses.PLACINGBOATS ? (
          <PlaceBoat />
        ) : gameState === GameStatuses.PLAYER1WIN ||
          gameState === GameStatuses.PLAYER2WIN ? (
          <h1>Player {GameStatuses.PLAYER1WIN ? "1" : "2"} Win!</h1>
        ) : gameState === GameStatuses.PLAYER1TURN ||
          GameStatuses.PLAYER2TURN ? (
          <GameView />
        ) : (
          <h2>waiting</h2>
        )}
      </React.Suspense>
    </Box>
  );
}
