import { Route, Switch } from "react-router-dom";
import React from "react";
import Loader from "./Loader";

const Game = React.lazy(() =>
  import(/* webpackChunkName: "Game" */ "./Components/Game")
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
        <Route path="/UserPage" component={PlayerPage} />
        <Route path="/loading" component={Loader} />
        <Route path="/" component={PlayerPage} />
      </Switch>
    </React.Suspense>
  );
}

export default Routes;
