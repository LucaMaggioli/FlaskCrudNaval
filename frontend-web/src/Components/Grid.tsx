// import Cell from "./Cell";

type GridProps = {
  maxCord: number;
};

export default function Grid({ maxCord }: GridProps) {
  let rows = [""];
  for (var i = 0; i < maxCord; i++) {
    // rows.push(<Cell></Cell>);
  }
  return <div>{rows}</div>;
}
