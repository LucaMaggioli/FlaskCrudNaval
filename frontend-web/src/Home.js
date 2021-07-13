import React from "react";

import { useNavalBattleContext } from "./hooks/NavalBattleContextProvider";

function Home() {
  const { startNewGame } = useNavalBattleContext();

  return (
    <div>
      <h1>Naval Battle</h1>
      <h2>Welcome to Naval Battle Game</h2>
      <button onClick={startNewGame}>Start a new game!</button>
    </div>
  );
}

export default Home;
