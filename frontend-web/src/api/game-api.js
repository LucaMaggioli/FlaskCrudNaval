// import { stringifyJson } from "../utils/localStorage";
import { ACCEPTED_STATUS, API_URL } from "./api-settings";

export function createGame(name = "random-game") {
  return fetch(`${API_URL}/game`, {
    method: "POST",
    body: JSON.stringify({ name: name }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (ACCEPTED_STATUS.includes(result.status)) {
      return result.json();
    } else {
      return result;
    }
  });
}

export function StartGameVsIa(playerName) {
  return fetch(`${API_URL}/game/vsia`, {
    method: "POST",
    body: JSON.stringify({ playerName }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (ACCEPTED_STATUS.includes(result.status)) {
      return result.json();
    } else {
      return result;
    }
  });
}
