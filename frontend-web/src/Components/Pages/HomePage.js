import React, { useState } from "react";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { Typography, Box, TextField, Button } from "@material-ui/core";

import { useNavalBattleContext } from "../../hooks/NavalBattleContextProvider";
import Chatter from "../MessagesChat/Chatter";

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gridGap: "20px",
};
const columnStyle = {
  display: "flex",
  flexDirection: "column",
};
export default function HomePage() {
  const { createPlayer, createLobby, currentLobby, currentPlayer, history } =
    useNavalBattleContext();
  const [playerName, setPlayerName] = useState("");
  const [ready, setReady] = useState(false);

  React.useEffect(() => {
    console.log("========== In HomePagem useFFect");
    console.log(currentLobby);
    console.log(currentPlayer);

    if (currentLobby !== undefined && currentPlayer !== undefined) {
      history.push("/lobby");
    }
  }, [currentLobby]);

  return (
    <Box style={columnStyle}>
      <Box style={rowStyle}>
        <Typography variant="h2">Welcome to the battlenavalGame</Typography>
      </Box>
      <Box style={{ display: "flex", flexDirection: "column", gridGap: "5px" }}>
        <TextField
          id="standard-basic"
          variant="outlined"
          label="choose a Nickname"
          value={playerName}
          onChange={(e) => {
            setReady(false);
            setPlayerName(e.target.value);
          }}
        />
        <Button
          variant="contained"
          disabled={playerName === "" || ready}
          onClick={() => {
            setReady(true);
            // createPlayer(playerName);
            createLobby(playerName);
          }}
          endIcon={<AccessibilityNewIcon />}
        >
          Create your Player !
        </Button>
      </Box>
    </Box>
  );
}
