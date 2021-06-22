import React from "react";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import { useHistory } from "react-router-dom";
import Box from "../styled-components/Box";
import { GameStates } from "../services/GameService";
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

  // const { gameState } = currentGame;

  return (
    <Box flexDirection="column" alignItems="center">
      <h1>Naval Battle {currentGame.id}</h1>
      <button onClick={stopGame}>Stop</button>
      <React.Suspense fallback={<Loader />}>
        {gameState === GameStates.PLACE_BOAT ? (
          <PlaceBoat />
        ) : gameState === GameStates.PLAYER1_TURN ? (
          <GameView />
        ) : (
          <h2>waiting</h2>
        )}
      </React.Suspense>
    </Box>
  );
}
