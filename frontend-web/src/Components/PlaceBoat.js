import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider"; // import styled from "styled-components";
import Cell from "./Cell";
import Grid from "./Grid";
// import { Body } from "../styled-components/Typography";

// const Container = styled.div({
//   maxWidth: 310,
// });
function clickCell(cellId) {
  console.log(`cell ${cellId} clicked`);
}

export default function PlaceBoat() {
  const { currentGame } = useNavalBattleContext();
  const player1 = currentGame.player1;
  console.log(currentGame.player1.grid.cordMax.x);

  const maxCordX = currentGame.player1.grid.cordMax.x;
  const maxCordY = currentGame.player1.grid.cordMax.y;

  return (
    <div>
      <p margin="8px 0">
        Place your boats by clicking on the grey boats then click on "add this
        boat" when you have finished one.
      </p>
      <Grid
        maxCordX={maxCordX}
        maxCordY={maxCordY}
        onCellClick={(cellId) => clickCell(cellId)}
      ></Grid>
    </div>
  );
}
