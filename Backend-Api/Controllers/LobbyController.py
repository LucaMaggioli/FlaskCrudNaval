import json

import flask
from flask import request, jsonify
from flask_cors import cross_origin


from DataProviders import PlayerDataProvider, LobbyDataProvider
from FlaskApp import NavalCrudApp
#from Models.Context import Context
from Models.Cordinate import Cordinate

from Models.Game import Game
from Models.Grid import Grid
from Models.Lobby import Lobby
from Models.Player import Player

#__Context = Context

_playerDataProvider = PlayerDataProvider
_lobbyDataProvider = LobbyDataProvider

@NavalCrudApp.route('/lobby', methods=['POST'])
@cross_origin()
def createLobby():
    playerNickname = request.json["nickname"]
    player = _playerDataProvider.AddPlayer(playerNickname)
    player = _playerDataProvider.setLobbyOwner(player.Id)

    lobby = _lobbyDataProvider.newLobby(player)
    return lobby.ToJson(), 200

@NavalCrudApp.route('/lobby/<int:lobbyUrl>', methods=['GET'])
@cross_origin()
def getLobby(lobbyUrl):
    lobby = _lobbyDataProvider.getLobbyByUrl(lobbyUrl)
    return lobby.ToJson(), 200


@NavalCrudApp.route('/lobby/join/<int:playerId>/<int:lobbyUrl>', methods=['GET'])
@cross_origin()
def joinLobby(playerId, lobbyUrl):
    playerGuest = _playerDataProvider.getPlayerById(playerId)
    lobby = _lobbyDataProvider.joinLobby(lobbyUrl, playerGuest)
    return lobby.ToJson(), 200



