// import React, { useState } from "react";
import { useState } from "react";
import { API_URL } from "../api/api-settings";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider"; // import styled from "styled-components";
import AvailableBoatsContainer from "./AvailableBoats/AvailableBoatContainer";
import Grid from "./Grid";

export default function PlaceBoat() {
  const { currentGame, setCurrentGame, placeRandomBoats, startGameVsIa } =
    useNavalBattleContext();

  const cordinates = currentGame.player1.grid.cordinates;
  const [boatToPlace, setBoatToPlace] = useState();

  function addBoatAtPosition(cellJson) {
    if (boatToPlace != null) {
      if (
        window.confirm(
          `Confirm place boat on cordinate 'x:${cellJson.x},y:${cellJson.y}'`
        )
      ) {
        fetch(`${API_URL}/game/${currentGame.id}/grid/addboat`, {
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

      <div style={{ display: "flex", flexDirection: "row", gridGap: "15px" }}>
        <div>
          <h2>Grille de placement de bateaux</h2>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <Grid
              cordinates={cordinates}
              onCellClick={(cellJson) => {
                addBoatAtPosition(cellJson);
              }}
            />
          </div>
        </div>
        <div>
          <button onClick={placeRandomBoats}>Place Random Boats</button>
          <button enabled={true} onClick={startGameVsIa}>
            Play VSIA !
          </button>
        </div>
        <div>
          <div>
            <h2>Bateaux disponibles</h2>
            <AvailableBoatsContainer
              availableBoats={currentGame.player1.grid.availableBoats}
              boatToBePlaced={boatToPlace}
              onBoatToPlaceClick={(boatToPlace) => setBoatToPlace(boatToPlace)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
