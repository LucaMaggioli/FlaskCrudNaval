import Cell from "./Cell";

export default function Grid({
  maxCordX,
  maxCordY,
  onCellClick = (cellJson) => {},
}) {
  let rows = [];

  for (let x = 0; x < maxCordX; x++) {
    let row = [];
    for (let y = 0; y < maxCordY; y++) {
      let cellId = `x${maxCordX - (x + 1)}y${y}`;
      let cellJson = { x: x, y: y };
      row.push(
        <Cell cellId={cellId} onClick={() => onCellClick(cellJson)}></Cell>
      );
    }
    rows.push(
      <div style={{ display: "flex", flexDirection: "row" }}>{row}</div>
    );
  }
  return <div style={{ display: "flex", flexDirection: "column" }}>{rows}</div>;
}
