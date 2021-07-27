import React, { useState } from "react";
import { API_URL } from "../api/api-settings";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider"; // import styled from "styled-components";
import AvailableBoatsContainer from "./AvailableBoats/AvailableBoatContainer";
import Grid from "./Grid";
import { Button, Box, Typography } from "@material-ui/core";

export default function PlaceBoat() {
  const {
    currentGame,
    setCurrentGame,
    currentPlayer,
    currentEnemyPlayer,
    placeRandomBoats,
    addBoatAtPosition,
    startGameVsIa,
    startGame,
  } = useNavalBattleContext();

  const cordinates = currentPlayer.grid.cordinates;
  const [boatToPlace, setBoatToPlace] = useState();

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
                addBoatAtPosition(boatToPlace, cellJson);
              }}
            />
          </div>
        </div>
        <div>
          <Button variant="contained" onClick={placeRandomBoats}>
            Place Random Boats
          </Button>
          <Button variant="contained" onClick={startGameVsIa}>
            Play VSIA !
          </Button>
          {currentEnemyPlayer !== undefined ? (
            <Button variant="contained" onClick={startGame}>
              Play vs {currentEnemyPlayer.nickname}
            </Button>
          ) : (
            <span></span>
          )}
        </div>
        <div>
          <div>
            <h2>Bateaux disponibles</h2>
            <AvailableBoatsContainer
              availableBoats={currentPlayer.grid.availableBoats}
              boatToBePlaced={boatToPlace}
              onBoatToPlaceClick={(boatToPlace) => {
                console.log(boatToPlace);
                setBoatToPlace(boatToPlace);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
