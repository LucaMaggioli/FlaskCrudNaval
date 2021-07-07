import React from "react";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import { useHistory } from "react-router-dom";
import Box from "../styled-components/Box";
import { GameStates } from "./Constants";

import Loader from "../Loader";

const PlaceBoat = React.lazy(() =>
  import(/* webpackChunkName: "PlaceBoat" */ "./PlaceBoat")
);

const GameView = React.lazy(() =>
  import(/* webpackChunkName: "PlaceBoat" */ "./GameView")
);

const FinishView = React.lazy(() =>
  import(/* webpackChunkName: "PlaceBoat" */ "./FinishView")
);

export default function Game() {
  const { currentGame, stopGame, gameState } = useNavalBattleContext();
  const history = useHistory();

  if (!currentGame || !currentGame.gameState) {
    history.push("/");
    return null;
  }

  return (
    <Box flexDirection="column" alignItems="center">
      <h1>Naval Battle {currentGame.id}</h1>
      <button onClick={stopGame}>Stop</button>
      <React.Suspense fallback={<Loader />}>
        {gameState === GameStates.PLACINGBOATS ? (
          <PlaceBoat />
        ) : gameState === GameStates.PLAYER1WIN ||
          gameState === GameStates.PLAYER2WIN ? (
          <FinishView />
        ) : gameState === GameStates.PLAYER1TURN ||
          GameStates.PLAYER2TURN ? (
          <GameView />
        ) : (
          <h2>waiting</h2>
        )}
      </React.Suspense>
    </Box>
  );
}
