import React, { useState } from "react";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider"; // import styled from "styled-components";
import Grid from "./Grid";

function addCellToCurrentBoat(cellId) {
  // setCurrentBoat(currentBoat + cellId);
}

export default function PlaceBoat() {
  const { currentGame, currentBoat } = useNavalBattleContext();
  const player1 = currentGame.player1;

  const maxCordX = currentGame.player1.grid.cordMax.x;
  const maxCordY = currentGame.player1.grid.cordMax.y;

  // const [currentBoat, setCurrentBoat] = useState([]);

  return (
    <div>
      <p margin="8px 0">
        Place your boats by clicking on the grey boats then click on "add this
        boat" when you have finished one.
      </p>
      <Grid
        maxCordX={maxCordX}
        maxCordY={maxCordY}
        onCellClick={(cellId) => {
          // setCurrentBoat((currentBoat) => [...currentBoat, cellId]);
          currentBoat = [...currentBoat, cellId];
          console.log(currentBoat);
        }}
      />
      {/* <PlaceBoatConfirm
        remainingBoat={remainingBoat}
        currentBoat={currentBoat}
        confirmActions={confirmActions}
      /> */}
    </div>
  );
}
