import flask
from flask import request
from flask_cors import cross_origin

from DataProviders import PlayerDataProvider
from DataProviders.GameDataprovider import GameDataprovider
from FlaskApp import NavalCrudApp
from Models.Boat import Boat
from Models.Cordinate import Cordinate
from Models.Game import Game
from Models.Player import Player


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

# for now only this below 2 controllers are Used
# for now players are hardcoded, this should be /game/ia
@NavalCrudApp.route("/game",  methods=['POST'])
@cross_origin()
def createGame():
    gameName = request.json
    player1 = Player(nickname="Luca")
    player2 = Player(nickname="IA")
    game = _gameDataProvider.Add(gameName, player1, player2)
    return game.ToJson()

@NavalCrudApp.route("/game/<int:currentGameId>/grid/addboat", methods=['GET', 'POST'])
@cross_origin()
def addBoatToGrid(currentGameId):
    game = _gameDataProvider.GetGameById(currentGameId)
    data = request.json
    boatToAddJson = data['boatToPlace']
    cellJson = data['cellJson']

    boatToAdd = Boat(boatName=boatToAddJson['boatName'], lenght=boatToAddJson['lenght'], orientation=boatToAddJson['orientation'], startCordinate=Cordinate(cellJson['x'], cellJson['y']))

    if game.Player1.Grid.CanPlaceBoat(boatToAdd):
        game.Player1.Grid.AddBoat(boatToAdd)
        for availableBoat in game.Player1.Grid.AvailableBoats:
            if availableBoat.BoatName == boatToAdd.BoatName:
                game.Player1.Grid.AvailableBoats.remove(availableBoat)
                print("removing boat '{}' from available".format(boatToAdd.ToJson()))
    else:
        return "can't add boat {}".format(boatToAdd), 400

    return (game.ToJson()), 200

@NavalCrudApp.route("/game/<int:currentGameId>/player/<int:playernumber>/grid/addRandomBoats", methods=['PATCH'])
@cross_origin()
def placeRandomBoats(currentGameId, playernumber):
    game = _gameDataProvider.GetGameById(currentGameId)

    if playernumber == 1:
        game.player1.Grid.PlaceRandomBoats()
        # player = game.player1
    if playernumber == 2:
        game.player2.Grid.PlaceRandomBoats()
        # player = game.player2

    return (game.ToJson()), 200
