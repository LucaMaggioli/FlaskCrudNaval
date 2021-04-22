export default function Cell(nCell: number) {
  return (
    <div
      key={nCell}
      style={{ border: "solid 1px black", padding: "10px" }}
    ></div>
  );
}
