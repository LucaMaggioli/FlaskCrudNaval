import React from "react";

export default function BoatToBePlaced({
  boat,
  boatToBePlaced,
  onBoatClick = (boat) => {},
}) {
  const isSelected =
    boatToBePlaced != null &&
    boat.lenght === boatToBePlaced.lenght &&
    boat.orientation === boatToBePlaced.orientation &&
    boat.boatName === boatToBePlaced.boatName;
  let boatHtml = [];
  for (let i = 0; i < boat.lenght; i++) {
    boatHtml.push(
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
        flexDirection: boat.orientation === 0 ? "column" : "row",
        border: isSelected ? "2px solid green" : "",
      }}
      onClick={() => {
        onBoatClick();
      }}
    >
      {boatHtml}
    </div>
  );
}
