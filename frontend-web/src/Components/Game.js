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
  const { currentGame, stopGame } = useNavalBattleContext();
  const history = useHistory();

  if (!currentGame || !currentGame.gameState) {
    history.push("/");
    return null;
  }
  const { gameState } = currentGame;

  return (
    <Box flexDirection="column" alignItems="center">
      <h1>Naval Battle {currentGame.id}</h1>
      <button onClick={stopGame}>Stop</button>
      <React.Suspense fallback={<Loader />}>
        {gameState === GameStates.PLACE_BOAT ? (
          <PlaceBoat currendGame={currentGame} />
        ) : (
          <GameView />
        )}
      </React.Suspense>
    </Box>
  );
}
