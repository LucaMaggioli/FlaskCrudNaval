import React, { useState } from "react";

function Cell({ cellStatus, cellId, onClick }) {
  // const [hovered, setHovered] = useState(false);
  let hover = false;

  return (
    <div
      onMouseHover={(hover = !hover)}
      // onMouseEnter={console.log("hover")}
      // setHovered(true)
      // onMouseLeave={console.log("not hover")}
      key={cellId}
      onClick={onClick}
      style={
        hover
          ? {
              border: "solid 1px blue",
              padding: "10px",
              width: "10px",
              height: "10px",
            }
          : {
              border: "solid 1px black",
              padding: "10px",
              width: "10px",
              height: "10px",
            }
      }
    ></div>
  );
}

export default Cell;
