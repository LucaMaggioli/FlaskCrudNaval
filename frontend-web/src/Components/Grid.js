import Cell from "./Cell";

export default function Grid({
  cordinates,
  maxCordX,
  maxCordY,
  onCellClick = (cellJson) => {},
}) {
  let rows = [];
  let cells = [];

  cordinates.forEach((cordinate) => {
    console.log(`pushing cordinate ${cordinate.x}, ${cordinate.y}`);
    let cellId = `x${cordinate.x}y${cordinate.y}`;
    let cellJson = { x: cordinate.x, y: cordinate.y };
    cells.push(
      <Cell
        cellId={cellId}
        cellStatus={cordinate.status}
        onClick={() => onCellClick(cellJson)}
      />
    );
  });

  for (let x = 0; x < maxCordX; x++) {
    let row = [];
    for (let y = 0; y < maxCordY; y++) {
      let cellId = `x${maxCordX - (x + 1)}y${y}`;
      let cellJson = { x: x, y: y };
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
          onClick={() => onCellClick(cellJson)}
        ></Cell>
      );
    }
    rows.push(
      <div style={{ display: "flex", flexDirection: "row" }}>{row}</div>
    );
  }
  return <div style={{ display: "flex", flexDirection: "column" }}>{rows}</div>;
  // return (
  //   <div style={{ display: "flex", flexWrap: "wrap", width: "100px" }}>
  //     {cells}
  //   </div>
  // );
}
