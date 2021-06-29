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
  const { currentGame, stopGame, currentPlayer, gameState } =
    useNavalBattleContext();
  const history = useHistory();

  console.log("player in Game");
  console.log(currentPlayer);

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
