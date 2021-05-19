export default function BoatToBePlaced(length, orientation) {
  let boat = [];
  for (let i = 0; i < length; i++) {
    boat.push.push(
      <div
        key={i}
        style={{
          border: "solid 1px green",
          padding: "10px",
          width: "10px",
          height: "10px",
        }}
      ></div>
    );
  }
  return boat;
}
