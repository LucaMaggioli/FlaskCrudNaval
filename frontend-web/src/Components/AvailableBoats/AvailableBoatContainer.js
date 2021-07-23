import React, { useState } from "react";
import BoatToBePlaced from "./boatToPlace";

export default function AvailableBoatsContainer({
  availableBoats = [],
  boatToBePlaced,
  onBoatToPlaceClick = (boat) => {},
}) {
  let boats = [];
  availableBoats.forEach((boat) => {
    boat.orientation = 0;
    let boatH = { ...boat };
    boat.orientation = 1;
    let boatV = { ...boat };
    boats.push(
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gridGap: "15px",
          alignItems: "center",
          padding: "15px",
          border: "solid brown 1px",
        }}
      >
        <BoatToBePlaced
          boat={boatH}
          boatToBePlaced={boatToBePlaced}
          onBoatClick={() => {
            onBoatToPlaceClick(boatH);
          }}
        />
        <BoatToBePlaced
          boat={boatV}
          boatToBePlaced={boatToBePlaced}
          onBoatClick={() => {
            onBoatToPlaceClick(boatV);
          }}
        />
      </div>
    );
  });
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        margin: "50px",
        gridGap: "15px",
      }}
    >
      {boats}
    </div>
  );
}
