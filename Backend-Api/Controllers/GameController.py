import flask
from flask import request, jsonify
from flask_cors import cross_origin

from DataProviders import PlayerDataProvider
from DataProviders.GameDataprovider import GameDataprovider
from FlaskApp import NavalCrudApp
from Models.Boat import Boat
from Models.Cordinate import Cordinate
from Models.Game import Game
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

# for now players are hardcoded, this should be /game/ia
@NavalCrudApp.route("/game",  methods=['POST'])
@cross_origin()
def createGame():
    gameName = request.json
    player1 = Player(nickname="Luca")
    player2 = Player(nickname="IA")
    game = _gameDataProvider.Add(gameName, player1, player2)
    return game.ToJson()

@NavalCrudApp.route("/game/<int:currentGameId>/grid/check/boat", methods=['GET', 'POST'])
@cross_origin()
def addBoatToGrid(currentGameId):
    game = _gameDataProvider.GetGameById(currentGameId)
    result = False
    data = request.json
    print(data)
    boatToAddJson = data['boatToPlace']
    cellJson = data['cellJson']

    boatToAdd = Boat(boatName=boatToAddJson['boatName'], lenght=boatToAddJson['lenght'], orientation=boatToAddJson['orientation'], startCordinate=Cordinate(cellJson['x'], cellJson['y']))

    if game.Player1.Grid.CanPlaceBoat(boatToAdd):
        game.Player1.Grid.AddBoat(boatToAdd)
        for availableBoat in game.Player1.Grid.AvailableBoats:
            if availableBoat.BoatName == boatToAdd.BoatName:
                game.Player1.Grid.AvailableBoats.remove(availableBoat)
                print("removing boat '{}' from available".format(boatToAdd.ToJson()))

        result = "Boat succesfully added"
    else:
        result = "Can't add boat"

    print(boatToAdd)
    print(game.ToJson())
    print(game.Player1.Grid.AvailableBoats)

    # game.Player1.Grid.CanPlaceBoat()
    # flask.Response(status=201)
    return (game.ToJson()), 200
# , {'ContentType': 'application/json'}