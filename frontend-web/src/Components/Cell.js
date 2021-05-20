import React, { useState } from "react";
import { CordinateStatus } from "./CordinateStatus";

function Cell({ cellStatus, cellId, onClick }) {
  // const [hovered, setHovered] = useState(false);
  let hover = false;
  let borderColor;

  switch (cellStatus) {
    case CordinateStatus.WATER:
      borderColor = "blue";
      break;
    case CordinateStatus.BOAT:
      borderColor = "brown";
      break;
    case CordinateStatus.HIT:
      borderColor = "red";
      break;
    case CordinateStatus.MISS:
      borderColor = "yellow";
      break;
    case CordinateStatus.SUNK:
      borderColor = "black";
      break;
    default:
      borderColor = "pink";
    // do nothing
  }

  return (
    <div
      onMouseHover={(hover = !hover)}
      // onMouseEnter={console.log("hover")}
      // setHovered(true)
      // onMouseLeave={console.log("not hover")}
      key={cellId}
      onClick={onClick}
      style={{
        border: `solid 1px ${borderColor}`,
        padding: "10px",
        width: "10px",
        height: "10px",
      }}
    ></div>
  );
}

export default Cell;
