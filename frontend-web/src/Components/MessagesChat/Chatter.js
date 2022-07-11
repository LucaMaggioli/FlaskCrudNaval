import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Paper, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import io from "socket.io-client";
import { useNavalBattleContext } from "../../hooks/NavalBattleContextProvider";
import { API_URL } from "../../api/api-settings";

let socket = io.connect(`${API_URL}`);

const Chatter = () => {
  const { currentPlayer } = useNavalBattleContext();
  const [messages, setMessages] = useState([""]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessages();
  }, [messages.length]);

  const getMessages = () => {
    socket.on("message", (msg) => {
      setMessages([...messages, msg]);
    });
  };

  // On Change
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // On Click
  const onClick = () => {
    if (message !== "") {
      socket.emit("message", `${currentPlayer.nickname}: ${message}`);

      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "30px", margin: "1em 0 1em 0" }}>
      <Typography component="h2">Welcome in the Global Chat!</Typography>
      {messages.length > 0 &&
        messages.map((msg) => (
          <div>
            <p>{msg}</p>
          </div>
        ))}
      <Box
        display="flex"
        flexDirection="row"
        gridGap="15px"
        alignItems="center"
      >
        <TextField
          variant="outlined"
          value={message}
          name="message"
          onChange={(e) => onChange(e)}
        />
        <Button
          style={{ height: "40px" }}
          variant="contained"
          onClick={() => onClick()}
          endIcon={<SendIcon />}
        >
          Send Message{" "}
        </Button>
      </Box>
    </Paper>
  );
};

export default Chatter;
