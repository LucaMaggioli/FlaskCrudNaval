import React, { useState } from "react";
import { API_URL } from "../api/api-settings";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider"; // import styled from "styled-components";
import AvailableBoatsContainer from "./AvailableBoats/AvailableBoatContainer";
import BoatToBePlaced from "./AvailableBoats/boatToPlace";
import Grid from "./Grid";

function addCellToCurrentBoat(currentBoat, cellId) {
  currentBoat = [...currentBoat, cellId];
  console.log(currentBoat);
  return currentBoat;
}

function checkCell(cellId, currentGameId) {
  console.log(currentGameId);
  fetch(`${API_URL}/grid/cell/check/${cellId}`, {
    method: "PATCH",
    body: JSON.stringify({ gameId: currentGameId }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

export default function PlaceBoat(props) {
  const {
    currentGame,
    currentGameId,
    currentBoat,
    setCurrentBoat,
  } = useNavalBattleContext();
  const player1 = currentGame.player1;
  const allal = props.currentGame;
  console.log(allal);
  const maxCordX = currentGame.player1.grid.cordMax.x;
  const maxCordY = currentGame.player1.grid.cordMax.y;

  // const [currentBoat, setCurrentBoat] = useState([]);

  return (
    <div>
      <p margin="8px 0">
        Place your boats by clicking on the grey boats then click on "add this
        boat" when you have finished one.
      </p>
      <BoatToBePlaced lenght={4} orientation={1} />
      <AvailableBoatsContainer availableBoats={currentGame.availableBoats} />
      <Grid
        // key={maxCordX + maxCordY}
        maxCordX={maxCordX}
        maxCordY={maxCordY}
        onCellClick={(cellId) => {
          setCurrentBoat(addCellToCurrentBoat(currentBoat, cellId));
          checkCell(cellId, currentGameId);
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
