import { getDefaultCompilerOptions } from "typescript";
import Grid from "../Components/Grid";
let grid;

export default function Game() {
  let margin = "5px";
  let maxCord = 10;
  // let grid = getGrid();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div style={{ margin: margin }} onClick={getGrid}>
        <p>Grid</p>
        <Grid maxCord={maxCord}></Grid>
      </div>
      <div style={{ margin: margin }}>Boat</div>
      <div style={{ margin: margin }}>Missile</div>
    </div>
  );

  function getGrid() {
    fetch("http://localhost:5001/grid")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // grid = data;
        return data;
      });
  }
}
