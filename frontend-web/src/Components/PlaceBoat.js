import React, { useState, useEffect } from "react";
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
    setCurrentGame,
    currentGameId,
    currentBoat,
    setCurrentBoat,
  } = useNavalBattleContext();

  const player1 = currentGame.player1;
  const allal = props.currentGame;
  console.log(allal);
  const maxCordX = currentGame.player1.grid.cordMax.x;
  const maxCordY = currentGame.player1.grid.cordMax.y;
  const cordinates = currentGame.player1.grid.cordinates;

  const [boatToPlace, setBoatToPlace] = useState();

  function addBoatToPlaceAtPosition(cellJson) {
    if (boatToPlace != null) {
      fetch(`${API_URL}/game/${currentGameId}/grid/check/boat`, {
        method: "POST",
        body: JSON.stringify({ boatToPlace: boatToPlace, cellJson: cellJson }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCurrentGame(data);
          return data;
        });
    } else {
      window.alert("Select a boat to place in that cordinate");
    }
  }

  function addStartCordToBoat(cellId) {
    setBoatToPlace(boatToPlace);

    console.log(`boat to add is`);
    console.log(boatToPlace);
  }

  return (
    <div>
      <p margin="8px 0">
        Place your boats by clicking on the grey boats then click on "add this
        boat" when you have finished one.
      </p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Grid
          cordinates={cordinates}
          maxCordX={maxCordX}
          maxCordY={maxCordY}
          onCellClick={(cellJson) => {
            addBoatToPlaceAtPosition(cellJson);
          }}
        />
        <AvailableBoatsContainer
          availableBoats={currentGame.player1.grid.availableBoats}
          boatToBePlaced={boatToPlace}
          onBoatToPlaceClick={(boatToPlace) => setBoatToPlace(boatToPlace)}
        />
      </div>
    </div>
  );
}
