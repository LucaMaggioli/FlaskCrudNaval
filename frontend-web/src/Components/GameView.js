import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider"; // import styled from "styled-components";
import Grid from "./Grid";

export default function GameView() {
  const { currentGame, currentPlayer, sendMissile } = useNavalBattleContext();

  let grid = currentGame.player1.grid;
  let gridPlay = currentGame.player1.gridPlay;

  return (
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
            sendMissile(currentGame.id, currentGame.player1.id, cordinate)
          }
        />
      </div>
    </div>
  );
}
