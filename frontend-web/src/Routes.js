import React from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "./Loader";

import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import { useNavalBattleContext } from "./hooks/NavalBattleContextProvider";

const Game = React.lazy(() =>
  import(/* webpackChunkName: "Game" */ "./Components/Game")
);
const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "HomePage" */ "./Components/Pages/HomePage")
);
const PlayerPage = React.lazy(() =>
  import(/* webpackChunkName: "PlayerPage" */ "./Components/Pages/PlayerPage")
);

function Routes() {
  const { currentPlayer } = useNavalBattleContext();
  console.log(`currentPlayer in routes is : ${currentPlayer}`);
  console.log(currentPlayer);

  return (
    <Box>
      <AppBar color="primary">
        <Toolbar>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Typography>
            {currentPlayer !== undefined
              ? `Welcome ${currentPlayer.nickname} !`
              : "Welcome, create your player !"}{" "}
          </Typography>
        </Toolbar>
      </AppBar>
      <React.Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/game" component={Game} />
          <Route path="/UserPage" component={HomePage} />
          <Route path="/loading" component={Loader} />
          <Route path="/lobby" component={PlayerPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </React.Suspense>
    </Box>
  );
}

export default Routes;
