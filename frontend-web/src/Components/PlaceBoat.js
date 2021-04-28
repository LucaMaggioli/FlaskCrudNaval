import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider"; // import styled from "styled-components";
// import { Body } from "../styled-components/Typography";

// const Container = styled.div({
//   maxWidth: 310,
// });
export default function PlaceBoat() {
  const { currentGame } = useNavalBattleContext();
  const player1 = currentGame.player1;
  console.log(currentGame.player1.grid.cordMax.x);

  let cells = [];
  for (let x = 0; x < currentGame.player1.grid.cordMax.x; x++) {
    for (let y = 0; y < currentGame.player1.grid.cordMax.y; y++) {
      cells.push(<p key={`x${x}y${y}`}>O</p>);
    }
  }
  console.log(cells);

  return (
    <div>
      <p margin="8px 0">
        Place your boats by clicking on the grey boats then click on "add this
        boat" when you have finished one.
      </p>
      <div>{cells}</div>
    </div>
  );
}
