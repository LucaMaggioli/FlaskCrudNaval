import { Route, Switch } from "react-router-dom";
import React from "react";
import Loader from "./Loader";

const Game = React.lazy(() =>
  import(/* webpackChunkName: "Game" */ "./Components/Game")
);
const UserPage = React.lazy(() =>
  import(/* webpackChunkName: "Game" */ "./Components/Pages/UserPage")
);

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ "./Home"));

function Routes() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/UserPage" component={UserPage} />
        <Route path="/loading" component={Loader} />
        <Route path="/" component={Home} />
      </Switch>
    </React.Suspense>
  );
}

export default Routes;
