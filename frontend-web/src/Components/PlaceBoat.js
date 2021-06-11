import React, { useState, useEffect } from "react";
import { API_URL } from "../api/api-settings";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider"; // import styled from "styled-components";
import AvailableBoatsContainer from "./AvailableBoats/AvailableBoatContainer";
import Grid from "./Grid";

export default function PlaceBoat() {
  const {
    currentGame,
    setCurrentGame,
    currenPlayer,
    setCurrentPlayer,
    placeRandomBoats,
  } = useNavalBattleContext();

  const maxCordX = currentGame.player1.grid.cordMax.x;
  const maxCordY = currentGame.player1.grid.cordMax.y;
  const cordinates = currentGame.player1.grid.cordinates;
  const [boatToPlace, setBoatToPlace] = useState();

  console.log("Player in PlaceBoats");
  console.log(currenPlayer);

  // function placeRandomBoats() {
  //   if (window.confirm(`Do you really want to place random boats?'`)) {
  //     fetch(`${API_URL}/player/${currenPlayer["id"]}/grid/addRandomBoats`, {
  //       method: "PATCH",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         setCurrentPlayer(data);
  //         // return data;
  //       })
  //       .catch(() => {
  //         window.alert(`Can't place boat randomly!`);
  //       });
  //   }
  // }

  function playVsIa() {
    fetch(`${API_URL}/game/${currentGame.id}/start`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((game) => {
        console.log(`game is`);
        console.log(game);
        setCurrentGame(game);
        // return data;
      })
      .catch(() => {
        window.alert(`Can't Start Game Vs Ia!`);
      });
  }

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
          <button enabled={true} onClick={playVsIa}>
            Play !
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
