import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import Grid from "./Grid";
import TurnIndicator from "./TurnIndicator";
import { Box } from "@material-ui/core";

export default function GameView() {
  const { currentGame, sendMissile, currentPlayer } = useNavalBattleContext();

  // let grid = currentGame.player1.grid;
  let grid = currentPlayer.grid;
  let gridPlay = currentPlayer.gridPlay;

  return (
    <Box>
      <Box>
        <TurnIndicator />
      </Box>
      <div style={{ display: "flex", flexDirection: "row", gridGap: "20px" }}>
        <div>
          <h2>Grille du joueur</h2>
          <Grid cordinates={grid.cordinates} />
        </div>
        <div>
          <h2>Grille de l'adversaire</h2>
          <Grid
            cordinates={gridPlay.cordinates}
            onCellClick={(cordinate) =>
              sendMissile(currentGame.id, currentPlayer.id, cordinate)
            }
          />
        </div>
      </div>
    </Box>
  );
}
