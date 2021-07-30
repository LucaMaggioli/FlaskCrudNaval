import React, { useState } from "react";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { profilesPictures } from "../Constants";

import { useNavalBattleContext } from "../../hooks/NavalBattleContextProvider";
import AvatarPicker from "../AvatarPicker";

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
  const { currentLobby, currentPlayer, history, login, updateLobby } =
    useNavalBattleContext();
  const [playerName, setPlayerName] = useState("");
  const [ready, setReady] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(0);

  const nextAvatarPic = () => {
    console.log(profilesPictures.lenght); //you should use profilesPictures.lenght instead of hardcoded 7
    setAvatarIndex((index) => (index >= 7 ? 0 : index + 1));
  };

  updateLobby();
  React.useEffect(() => {
    if (currentLobby !== undefined && currentPlayer !== undefined) {
      history.push("/lobby");
    }
  }, [currentLobby, currentPlayer]);

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

        <Box style={{ margin: "2em 0 2em 0" }}>
          <AvatarPicker
            image={profilesPictures[avatarIndex]}
            onShuffle={nextAvatarPic}
          />
        </Box>
        <Button
          variant="contained"
          disabled={playerName === "" || ready}
          onClick={() => {
            setReady(true);
            login(playerName, avatarIndex);
          }}
          endIcon={<AccessibilityIcon />}
        >
          Create your Player !
        </Button>
      </Box>
    </Box>
  );
}
