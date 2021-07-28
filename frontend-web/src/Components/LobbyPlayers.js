import { Box, Card, CardContent, Typography } from "@material-ui/core";

export default function LobbyPlayers(player1, player2) {
  return (
    <Box
      style={{
        display: "fley",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "1em 0 1em 0",
      }}
    >
      <Card style={{ marginTop: "2em" }}>
        <CardContent>
          <Typography variant="h4" component="h2">
            {player1.nickname}
          </Typography>
          <Typography variant="body2" component="p">
            Hi
          </Typography>
        </CardContent>
      </Card>
      <Card style={{ marginTop: "2em" }}>
        <CardContent>
          <Typography variant="h4" component="h2">
            {player2.nickname}
          </Typography>
          <Typography variant="body2" component="p">
            Hi
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
