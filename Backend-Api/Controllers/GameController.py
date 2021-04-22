import flask
from flask import request
from flask_cors import cross_origin

from DataProviders import PlayerDataProvider
from DataProviders.GameDataprovider import GameDataprovider
from FlaskApp import NavalCrudApp
from Models.Player import Player


# _gameDataProvider = GameDataprovider(BattleshipContext)
_gameDataProvider = GameDataprovider()
_playerDataProvider = PlayerDataProvider

@NavalCrudApp.route('/game/startGameVsIa', methods=['POST'])
def startGamevsIa():

    if request.method == 'POST':
        player1Id = request.form['player1Id']
        player1 = _playerDataProvider.getPlayerById(player1Id)
        player1 = Player()
        player2 = Player(nickname="IA")

        game = _gameDataProvider.Add(player1, player2)

        return flask.render_template("html/gamePage.html", grid=player1.Grid.ToJson(), availableBoats=game.GameBoats)

@NavalCrudApp.route("/game/placeboats")
def placeboats():
    print("Hello from Placeboats ")
    return {'boat': True}

@NavalCrudApp.route("/game",  methods=['POST'])
@cross_origin()
def createGame():
    game = request.json
    print(type(game))
    print(game)
    return game