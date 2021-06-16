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

export function AddPlayer(nickname) {
  return fetch(`${API_URL}/player/add`, {
    method: "POST",
    body: JSON.stringify({ nickname }),
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

export function StartGameVsIa(playerId) {
  if (!playerId) {
    return "error";
  } else {
    return fetch(`${API_URL}/game/create/player/${playerId}/vsia`, {
      method: "POST",
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
}

export function PlaceRandomBoats(gameId, playerId) {
  if (!playerId) {
    return "error player Id must not be null";
  } else {
    return fetch(
      `${API_URL}/game/${gameId}/player/${playerId}/grid/placeRandomBoats`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then((result) => {
      if (ACCEPTED_STATUS.includes(result.status)) {
        return result.json();
      } else {
        return result;
      }
    });
  }
}
