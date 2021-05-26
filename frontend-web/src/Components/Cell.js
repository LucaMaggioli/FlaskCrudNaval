import React, { useState } from "react";
import { CordinateStatus } from "./Constants";

function Cell({ cellStatus, cellId, onClick }) {
  let hover = false;
  let bgColor;

  switch (cellStatus) {
    case CordinateStatus.WATER:
      bgColor = "blue";
      break;
    case CordinateStatus.BOAT:
      bgColor = "green";
      break;
    case CordinateStatus.HIT:
      bgColor = "red";
      break;
    case CordinateStatus.MISS:
      bgColor = "yellow";
      break;
    case CordinateStatus.SUNK:
      bgColor = "black";
      break;
    default:
      bgColor = "blue";
    // do nothing
  }

  return (
    <div
      key={cellId}
      onClick={onClick}
      style={{
        border: `solid 1px`,
        backgroundColor: bgColor,
        padding: "10px",
        width: "10px",
        height: "10px",
      }}
    ></div>
  );
}

export default Cell;
