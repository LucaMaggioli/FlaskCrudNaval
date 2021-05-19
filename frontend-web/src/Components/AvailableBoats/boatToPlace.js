import React from "react";

export default function BoatToBePlaced({ lenght, orientation }) {
  let boat = [];
  for (let i = 0; i < lenght; i++) {
    console.log(`Boat cell: ${i}`);
    boat.push(
      <div
        key={i}
        style={{
          border: "solid 1px green",
          padding: "10px",
          width: "10px",
          height: "10px",
        }}
      />
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: (orientation = 0 ? "column" : "row"),
      }}
    >
      {boat}
    </div>
  );
}
