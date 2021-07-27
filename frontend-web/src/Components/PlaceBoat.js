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
    <Box style={{ display: "flex", flexDirection: "column", marginTop: "5em" }}>
      <Box style={{ display: "flex", flexDirection: "row", gridGap: "15px" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">Grille de placement de bateaux</Typography>

          <Box style={{ display: "flex", flexDirection: "row" }}>
            <Grid
              cordinates={cordinates}
              onCellClick={(cellJson) => {
                addBoatAtPosition(boatToPlace, cellJson);
              }}
            />
          </Box>
        </Box>

        {/* <Box> */}
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">Bateaux disponibles</Typography>
          <AvailableBoatsContainer
            availableBoats={currentPlayer.grid.availableBoats}
            boatToBePlaced={boatToPlace}
            onBoatToPlaceClick={(boatToPlace) => {
              console.log(boatToPlace);
              setBoatToPlace(boatToPlace);
            }}
          />
        </Box>
        {/* </Box> */}
      </Box>
      <Box
        style={{
          marginTop: "5em",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gridGap: "1em",
        }}
      >
        <Button variant="contained" onClick={placeRandomBoats}>
          Place Random Boats
        </Button>
        <Button variant="contained" onClick={startGameVsIa}>
          Play VSIA !
        </Button>
        <Button
          style={{
            display: currentEnemyPlayer === undefined ? "none" : "true",
          }}
          variant="contained"
          onClick={startGame}
        >
          Play vs{" "}
          {currentEnemyPlayer !== undefined
            ? currentEnemyPlayer.nickname
            : "None"}
        </Button>
      </Box>
    </Box>
  );
}
