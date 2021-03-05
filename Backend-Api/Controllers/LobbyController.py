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
        player = request.form['player']
        print(player)
        #here you have to set the player as owner
        #then you have to create the lobby as u did for player, and add lobby to context
        lobby = {'id': 1, 'player1': player, 'player2': None}
        return flask.render_template("html/lobbyPage.html", lobby=lobby)
#playerId = player[0]
        #print(playerId)
        #_playerDataProvider.setLobbyOwner(playerId)
        #lobby =_lobbyDataProvider.createLobby(player)



@NavalCrudApp.route('/startGame', methods=['POST'])
def startGame():
    if request.method == "POST":

        gridSize = request.form["gridSize"]
        gridP1 = Grid(gridSize)
        gridP2 = Grid(gridSize)

        playerNickname = request.form["nickName"]
        player1 = Player(playerNickname)
        player1.Board = gridP1

        player2 = Player("IA")
        player2.Board = gridP2

        newGameId = request.form['newGameId']
        _game = Game(newGameId, player1, player2)

        lobby = Lobby()
        lobby.addGame(_game)
        #__Context.SaveLobby(lobby)
        #dictGame = json.dumps(_game.__dict__)
        dictGame = _game.__dict__()

        return flask.render_template("html/game.html", gridSize=gridSize, dictGame=dictGame)
