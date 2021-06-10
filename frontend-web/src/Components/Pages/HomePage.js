import React, { useState } from "react";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { Box, TextField, Button } from "@material-ui/core";

import { useNavalBattleContext } from "../../hooks/NavalBattleContextProvider";

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
  const { startNewGameVsIa, createPlayer, currentPlayer } =
    useNavalBattleContext();
  const [playerName, setPlayerName] = useState("");
  const [ready, setReady] = useState(false);

  return (
    <Box style={columnStyle}>
      <Box style={rowStyle}>
        <h1>Welcome to the battlenavalGame</h1>
        <AccessibilityNewIcon></AccessibilityNewIcon>
      </Box>
      <Box style={{ display: "flex", flexDirection: "column", gridGap: "5px" }}>
        <TextField
          id="standard-basic"
          variant="outlined"
          label="choose a Username"
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
            createPlayer(playerName);
          }}
        >
          Create my Lobby!
        </Button>
        <Button
          variant="contained"
          disabled={playerName === "" || ready}
          onClick={() => {
            setReady(true);
            console.log("Work in progress to join a lobby");
          }}
        >
          Join a Friend Lobby!
        </Button>
      </Box>
    </Box>
  );
}
