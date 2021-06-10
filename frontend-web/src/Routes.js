import { Route, Switch } from "react-router-dom";
import React from "react";
import Loader from "./Loader";

const Game = React.lazy(() =>
  import(/* webpackChunkName: "Game" */ "./Components/Game")
);
const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "HomePage" */ "./Components/Pages/HomePage")
);
const PlayerPage = React.lazy(() =>
  import(/* webpackChunkName: "PlayerPage" */ "./Components/Pages/PlayerPage")
);

// const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ "./Home"));

function Routes() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/UserPage" component={HomePage} />
        <Route path="/loading" component={Loader} />
        <Route path="/player" component={PlayerPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </React.Suspense>
  );
}

export default Routes;
