import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { profilesPictures } from "./Constants";

export default function PlayerCard(props) {
  let player = props.player;
  let imCurrentPlayer = props.imCurrentPlayer;
  return (
    <Card
      style={{
        marginTop: "2em",
        minHeight: "10em",
        minWidth: "10em",
        border: imCurrentPlayer ? "2px solid green" : "none",
      }}
    >
      <CardContent
        style={{
          alignItems: " center",
          display: "flex",
          flexDirection: "column",
          gridGap: "2em",
        }}
      >
        <Typography variant="h4" component="h2">
          {player.nickname}
        </Typography>
        <Typography variant="body2" component="p">
          <Box
            border={2}
            display="flex"
            borderColor="primary.main"
            borderRadius="50%"
            width="10em"
            height="10em"
            bgcolor="background.default"
          >
            <img src={profilesPictures[player.avatarIndex]} alt="Avatar" />
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
}
