import Cell from "./Cell";

function sortCordinates(cordinates) {
  cordinates.sort((a, b) => parseFloat(a.x) - parseFloat(b.x));
  cordinates.sort((a, b) => parseFloat(b.y) - parseFloat(a.y));
  return cordinates;
}

export default function Grid({ cordinates, onCellClick = (cellJson) => {} }) {
  const grid = [];
  cordinates = sortCordinates(cordinates);

  cordinates.forEach((cordinate) => {
    grid.push(
      <Cell
        cellId={cordinate.id}
        cellStatus={cordinate.status}
        onClick={() => {
          onCellClick(cordinate);
        }}
      />
    );
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        height: "fit-content",
      }}
    >
      {grid}
    </div>
  );
}
