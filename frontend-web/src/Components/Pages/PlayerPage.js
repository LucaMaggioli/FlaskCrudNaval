import { useNavalBattleContext } from "../../hooks/NavalBattleContextProvider";
import { Box, Button } from "@material-ui/core";

export default function PlayerPage() {
  const { startNewGameVsIa, currentPlayer, currentPlayerId } =
    useNavalBattleContext();

  let actualPlayer = currentPlayer ? currentPlayer : { nickname: "defaultCP" };
  console.log("current player in PlayerPage");
  console.log(currentPlayer);
  return (
    <>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <h1>Welcome to your lobby {currentPlayer["nickname"]} !</h1>
        <Box style={{ display: "flex", flexDirection: "row", gridGap: "5px" }}>
          <Button
            variant="contained"
            // disabled={!ready}
            onClick={() => {
              startNewGameVsIa(currentPlayer["id"]);
            }}
          >
            Play vs Ia
          </Button>
          <Button
            variant="contained"
            // disabled={!ready}
          >
            Play vs Player
          </Button>
        </Box>
      </Box>
    </>
  );
}
