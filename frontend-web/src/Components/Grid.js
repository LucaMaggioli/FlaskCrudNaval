import Cell from "./Cell";

export default function Grid({
  cordinates,
  maxCordX,
  maxCordY,
  onCellClick = (cellJson) => {},
}) {
  const grid = [];

  for (let x = 0; x < maxCordX; x++) {
    let row = [];
    for (let y = 0; y < maxCordY; y++) {
      let xInGrid = maxCordX - (x + 1);
      let cellId = `x${xInGrid}y${y}`;
      let cellJson = { x: xInGrid, y: y };
      let status;
      cordinates.forEach((cordinate) => {
        if (cordinate.id === cellId) {
          status = cordinate.status;
        }
      });
      row.push(
        <Cell
          cellId={cellId}
          cellStatus={status}
          onClick={() => {
            onCellClick(cellJson);
          }}
        ></Cell>
      );
    }
    grid.push(
      <div style={{ display: "flex", flexDirection: "row" }}>{row}</div>
    );
  }
  return <div style={{ display: "flex", flexDirection: "column" }}>{grid}</div>;
}
