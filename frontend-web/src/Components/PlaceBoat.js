import React, { useState, useEffect } from "react";
import { API_URL } from "../api/api-settings";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider"; // import styled from "styled-components";
import AvailableBoatsContainer from "./AvailableBoats/AvailableBoatContainer";
import BoatToBePlaced from "./AvailableBoats/boatToPlace";
import Grid from "./Grid";

export default function PlaceBoat() {
  const { currentGame, setCurrentGame, currentGameId } =
    useNavalBattleContext();

  const maxCordX = currentGame.player1.grid.cordMax.x;
  const maxCordY = currentGame.player1.grid.cordMax.y;
  const cordinates = currentGame.player1.grid.cordinates;

  const [boatToPlace, setBoatToPlace] = useState();

  function addBoatAtPosition(cellJson) {
    if (boatToPlace != null) {
      if (
        window.confirm(
          `Confirm place boat on cordinate 'x:${cellJson.x},y:${cellJson.y}'`
        )
      ) {
        fetch(`${API_URL}/game/${currentGameId}/grid/addboat`, {
          method: "POST",
          body: JSON.stringify({
            boatToPlace: boatToPlace,
            cellJson: cellJson,
          }),
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
          })
          .catch(() => {
            window.alert(`Can't place boat at that position!`);
          });
      }
    } else {
      window.alert("Select a boat to place in that cordinate");
    }
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
            addBoatAtPosition(cellJson);
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
