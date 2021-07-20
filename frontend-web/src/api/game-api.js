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

export function CreateLobby(nickname, sessionId) {
  return fetch(`${API_URL}/lobby`, {
    method: "POST",
    // body: JSON.stringify({ playerId }),
    body: JSON.stringify({ nickname, sessionId }),
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
// export function CreateLobbySocket(socket, nickname) {
// }

export function JoinLobby(lobbyUrl, playerId) {
  return fetch(`${API_URL}/lobby/join/${playerId}/${lobbyUrl}`, {
    method: "POST",
    // body: JSON.stringify({ playerId }),
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

export function CreateGameVsIa(playerId) {
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

export function AddBoatAtPosition(gameId, playerId, boatToPlace, cellJson) {
  if (boatToPlace != null) {
    if (
      window.confirm(
        `Confirm place boat on cordinate 'x:${cellJson.x},y:${cellJson.y}'`
      )
    ) {
      fetch(`${API_URL}/game/${gameId}/player/${playerId}/addboat`, {
        method: "POST",
        body: JSON.stringify({
          boatToPlace: boatToPlace,
          cellJson: cellJson,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((result) => {
          if (ACCEPTED_STATUS.includes(result.status)) {
            return result.json();
          } else {
            return result;
          }
        })
        .catch(() => {
          window.alert(`Can't place boat at that position!`);
        });
    }
  } else {
    window.alert("Select a boat to place in that cordinate");
  }
}

export function CreateGame(player1Id, player2Id) {
  return fetch(`${API_URL}/game/${player1Id}/vs/${player2Id}`, {
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

export function StartGame(gameId, playerId) {
  if (!gameId) {
    return "error game Id must not be null";
  } else {
    return fetch(`${API_URL}/game/${gameId}/${playerId}/ready`, {
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
