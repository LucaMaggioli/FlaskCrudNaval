import json

import flask
from flask import request, jsonify

from DataProviders import PlayerDataProvider, LobbyDataProvider
from FlaskApp import NavalCrudApp
#from Models.Context import Context
from Models.Cordinate import Cordinate

from Models.Game import Game
from Models.Grid import Grid
from Models.Lobby import Lobby
from Models.Player import Player

#__Context = Context

_game = Game
_playerDataProvider = PlayerDataProvider
_lobbyDataProvider = LobbyDataProvider

@NavalCrudApp.route('/lobby/new', methods=['POST'])
def gameTemplate():

    if request.method == 'POST':
        player_str = request.form['player']
        playerId = request.form['playerId']
        playerNickname = request.form['playerNickname']
        playerLobbyOwner = request.form['playerLobbyOwner']
        print(playerId)
        # player = None
        player = _playerDataProvider.setLobbyOwner(playerId)
        print(player)
        # player = dict({"id":playerId, "nickname":playerNickname, "lobbyOwner":playerLobbyOwner})

            
        #here you have to set the player as owner
        #then you have to create the lobby as u did for player, and add lobby to context
        lobby = _lobbyDataProvider.newLobby(player)
        return flask.render_template("html/lobbyPage.html", lobby=lobby.ToJson())
        #_playerDataProvider.setLobbyOwner(playerId)
        #lobby =_lobbyDataProvider.createLobby(player)



        # return flask.render_template("html/game.html", gridSize=gridSize, dictGame=dictGame)
