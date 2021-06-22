import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider"; // import styled from "styled-components";
import Grid from "./Grid";

export default function GameView() {
  const { currentGame, sendMissile, currentPlayer } = useNavalBattleContext();

  // let grid = currentGame.player1.grid;
  console.log("Currentplayer in GameView");
  console.log(currentPlayer);
  let grid = currentPlayer.grid;
  let gridPlay = currentPlayer.gridPlay;

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
            sendMissile(currentGame.id, currentPlayer.id, cordinate)
          }
        />
      </div>
    </div>
  );
}
