import BoatToBePlaced from "./boatToPlace";

export default function AvailableBoatsContainer({
  availableBoats = [],
  //   onBoatClick = () => {},
}) {
  let boats = [];
  availableBoats.forEach((boat) => {
    boats.push(
      <BoatToBePlaced lenght={boat.lenght} orientation={boat.orientation} />
    );
  });
  return <div style={{ display: "flex", flexDirection: "row" }}>{boats}</div>;
}
