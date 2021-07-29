import { Box, Card, CardContent, Typography } from "@material-ui/core";
import PlayerCard from "./PlayerCard";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";

export default function LobbyPlayers(props) {
  let lobby = props.lobby;
  let currentPlayer = props.currentPlayer;
  return (
    <Box
      style={{
        display: "flex",
        gridGap: "3em",
        flexDirection: "row",
        justifyContent: "center",
        margin: "1em 0 1em 0",
      }}
    >
      {lobby !== undefined && lobby.host !== undefined ? (
        <PlayerCard
          player={lobby.host}
          imCurrentPlayer={currentPlayer.id === lobby.host.id}
        ></PlayerCard>
      ) : (
        ""
      )}
      {lobby !== undefined && lobby.guest.id !== -1 ? (
        <PlayerCard
          player={lobby.guest}
          imCurrentPlayer={currentPlayer.id === lobby.guest.id}
        ></PlayerCard>
      ) : (
        ""
      )}
    </Box>
  );
}
