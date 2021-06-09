import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider"; // import styled from "styled-components";
import Grid from "./Grid";

export default function GameView() {
  const { currentGame, currentPlayer } = useNavalBattleContext();

  let p1cordinates = currentGame.player1.grid.cordinates;
  let p2cordinates = currentGame.player2.grid.cordinates;

  console.log("currentGame cordinates p1 in GameView");
  console.log(p1cordinates);
  console.log("currentGame cordinates p1 in GameView");
  console.log(p2cordinates);

  return (
    <div style={{ display: "flex", flexDirection: "row", gridGap: "20px" }}>
      <div>
        <h2>Grille du joueur</h2>
        <Grid cordinates={p1cordinates} />
      </div>
      <div>
        <h2>Grille de l'adversaire</h2>
        <Grid cordinates={p2cordinates} />
      </div>
    </div>
  );
}
