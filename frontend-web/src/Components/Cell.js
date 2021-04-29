function Cell({ cellId, onClick }) {
  return (
    <div
      key={cellId}
      onClick={onClick}
      style={{
        border: "solid 1px black",
        padding: "10px",
        width: "10px",
        height: "10px",
      }}
    ></div>
  );
}

export default Cell;
