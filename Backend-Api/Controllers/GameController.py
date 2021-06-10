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
from Models.Constants import GameStates, GameMode

_gameDataProvider = GameDataprovider()
_playerDataProvider = PlayerDataProvider

@NavalCrudApp.route('/game/player/<int:playerId>/VsIa', methods=['POST'])
@cross_origin()
def startGamevsIa(playerId):
    player1 = _playerDataProvider.getPlayerById(playerId)
    player2 = _playerDataProvider.addPlayer("IA")
    game = _gameDataProvider.Add(player1=player1, player2=player2)#TODO: add the game name from the frontend
    return game.ToJson(), 200

@NavalCrudApp.route("/game/placeboats")
def placeboats():
    print("Hello from Placeboats ")
    return {'boat': True}

# for now only below controllers are Used
@NavalCrudApp.route("/games", methods=['GET'])
@cross_origin()
def getGames():
    return jsonify(_gameDataProvider.GetGames())

# for now players are hardcoded, this should be /game/ia
@NavalCrudApp.route("/game",  methods=['POST'])
@cross_origin()
def createGame():
    gameName = request.json
    player1 = Player(nickname="Luca")
    game = _gameDataProvider.Add(gameName, player1)
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
        if game.Player1.Grid.AvailableBoats == []:
            game.Player1.Ready = True
    else:
        return "can't add boat {}".format(boatToAdd), 400

    return (game.ToJson()), 200

@NavalCrudApp.route("/game/<int:currentGameId>/player/<int:playernumber>/grid/addRandomBoats", methods=['PATCH'])
@cross_origin()
def placeRandomBoats(currentGameId, playernumber):
    game = _gameDataProvider.GetGameById(currentGameId)

    game = _gameDataProvider.AddRandomBoats(game.Id, playernumber)

    # if playernumber == 1:
    #     game.Player1.Grid.PlaceRandomBoats()
    #     if game.Player1.Grid.AvailableBoats == []:
    #         game.Player1.Ready = True
    #     # player = game.player1
    # if playernumber == 2:
    #     game.Player2.Grid.PlaceRandomBoats()
    #     if game.Player2.Grid.AvailableBoats == []:
    #         game.Player2.Ready = True
    #     # player = game.player2

    return (game.ToJson()), 200

@NavalCrudApp.route("/game/<int:currentGameId>/start/vsIA", methods=['POST'])
@cross_origin()
def playVsIa(currentGameId):
    print(currentGameId)
    game = _gameDataProvider.GetGameById(currentGameId)
    print(game.Id)
    print(game.Player2.Grid.Boats)
    game.Player2.NickName = "IA"
    game = _gameDataProvider.AddRandomBoats(game.Id, 2)
    # game.Player2.Grid.PlaceRandomBoats()
    print(game.Player2.Grid.Boats)

    # for gamey in _gameDataProvider.GetGames():
    #     print(gamey)

    # game.Player1.GridPlay = game.Player2.Grid
    # game.Player2.GridPlay = game.Player1.Grid

    game.GameMode = GameMode.VSIA
    game.GameState = GameStates.PLAYER1TURN
    print('returned game from python is {}'.format(game.ToJson()))
    print('player1 boats are {}'.format(game.Player1.Grid.ToJson()))
    print('player2 boats are {}'.format(game.Player2.Grid.ToJson()))

    return game.ToJson(), 200
