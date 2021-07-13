import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./Home";
// import Play from "./Play";
import "./index.css";
import Game from "./Pages/Game";

export default function Main() {
  return (
    <HashRouter>
      <div>
        <h1>BattleShip Game</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/play">Play</NavLink>
        <NavLink to="/game">Game</NavLink>
      </div>
      <div style={{ marginTop: "34px" }}>
        <div className="content">
          <Route exact path="/" component={Home} />
          {/* <Route path="/play" component={Play} /> */}
          <Route path="/game" component={Game} />
        </div>
      </div>
    </HashRouter>
  );
}
