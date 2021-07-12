import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import Grid from "./Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useNavalBattleContext } from "../hooks/NavalBattleContextProvider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionContent: {
    display: "flex",
    justifyContent: "space-between",
    marginRight: "10px",
  },
  accordionSecondaryTitle: {
    marginLeft: "10%",
    marginRight: "10%",
  },
  accordionMainTitle: { marginRight: "10%" },
}));

export default function GamesDisplayer(games) {
  const { currentPlayer } = useNavalBattleContext();
  const styles = useStyles();

  let listOfGames = [];

  if (games !== null && games.lenght !== 0) {
    games["games"].forEach((game) => {
      console.log(game);
      let gamePLayer =
        currentPlayer.id === game["player1"].id
          ? game["player1"]
          : game["player2"];

      let enemyPlayer =
        currentPlayer.id === game["player1"].id
          ? game["player2"]
          : game["player1"];

      let gamePlayerWon = currentPlayer.id === game["playerWinnerId"];

      listOfGames.push(
        <Accordion style={{ margin: "10px 0 10px 0" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            classes={{ content: styles.accordionContent }}
          >
            <Typography>{game["name"]}</Typography>
            <Typography
              style={{ color: gamePlayerWon ? "#90F150" : "#FF5733" }}
            >
              {gamePlayerWon ? "You Win this game" : "You Lost this game"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                gridGap: "20px",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  component="h2"
                  style={{ wordBreak: "break-all", color: "#5385FD" }}
                >
                  {gamePLayer["nickname"]}
                </Typography>
                <Grid cordinates={gamePLayer["grid"]["cordinates"]} />
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography
                  component="h2"
                  style={{ wordBreak: "break-all", color: "#FF5733" }}
                >
                  {enemyPlayer["nickname"]}
                </Typography>
                <Grid cordinates={enemyPlayer["grid"]["cordinates"]} />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      );
    });
  }

  return (
    <Box style={{ margin: "1em 0 1em 0" }}>
      <Typography variant="h3">
        {listOfGames.length !== 0 ? "Games" : ""}
      </Typography>
      <Box>{listOfGames}</Box>
    </Box>
  );
}
