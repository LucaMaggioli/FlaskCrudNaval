import { ACCEPTED_STATUS, API_URL } from "./api-settings";

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

export function CreateGame(playerId) {
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

export function StartGameVsIa(gameId) {
  if (!gameId) {
    return "error game Id must not be null";
  } else {
    return fetch(`${API_URL}/game/${gameId}/start/vsia`, {
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

export function SendMissile(gameId, playerId, cordinate) {
  if (!playerId || !gameId) {
    return "error player Id or GameId must not be null";
  } else {
    return fetch(`${API_URL}/game/${gameId}/player/${playerId}/sendMissile`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cordinate }),
    }).then((result) => {
      if (ACCEPTED_STATUS.includes(result.status)) {
        return result.json();
      } else {
        return result;
      }
    });
  }
}

export function IASendMissile(gameId) {
  if (!gameId) {
    return "error player GameId must not be null";
  } else {
    return fetch(`${API_URL}/game/${gameId}/IAattack`, {
      method: "PATCH",
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

export function UpdateGame(gameId) {
  if (!gameId) {
    return "error player GameId must not be null";
  } else {
    return fetch(`${API_URL}/game/${gameId}`, {
      method: "GET",
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

export function LeaveGame(gameId, playerId) {
  if (!gameId) {
    return "error player GameId must not be null";
  } else {
    return fetch(`${API_URL}/game/${gameId}/leave/player/${playerId}`, {
      method: "PATCH",
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

export function GetPlayerGames(playerId) {
  if (!playerId) {
    return "error player GameId must not be null";
  } else {
    return fetch(`${API_URL}/games/player/${playerId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      if (ACCEPTED_STATUS.includes(result.status)) {
        console.log("Result from server in game-api: ");
        console.log(result);
        return result.json();
      } else {
        return result;
      }
    });
  }
}
