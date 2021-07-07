import { useNavalBattleContext } from "../../hooks/NavalBattleContextProvider";
import { Box, Button } from "@material-ui/core";

export default function PlayerPage() {
  const { createGame, currentPlayer } = useNavalBattleContext();

  return (
    <>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <h1>Welcome to your lobby {currentPlayer["nickname"]} !</h1>
        <Box style={{ display: "flex", flexDirection: "row", gridGap: "5px" }}>
          <Button
            variant="contained"
            onClick={() => {
              console.log(
                `calling start a new Game vs ia, player id is ${currentPlayer["id"]}`
              );
              createGame(currentPlayer["id"]);
            }}
          >
            Play vs Ia
          </Button>
          <Button variant="contained">Invite Friend (todo)</Button>
        </Box>
      </Box>
    </>
  );
}
