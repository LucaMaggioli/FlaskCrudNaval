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

#Call this endpoint to start a game vs IA
@NavalCrudApp.route('/game/create/player/<int:playerId>/vsia', methods=['POST'])
@cross_origin()
def startGamevsIa(playerId):
    player1 = _playerDataProvider.getPlayerById(playerId)
    game = _gameDataProvider.Add(player1=player1)#TODO: add the game name from the frontend
    return game.ToJson(), 200

#Call this endpoint to place random boats in a Grid of a player
@NavalCrudApp.route("/game/<int:gameId>/player/<int:playerId>/grid/placeRandomBoats", methods=['PATCH'])
@cross_origin()
def placeRandomBoats(gameId, playerId):
    game = _gameDataProvider.GetGameById(gameId)
    player = _playerDataProvider.AddRandomBoats(playerId)
    if game.Player1.Id == playerId:
        game.Player1 = player
    if game.Player2.Id == playerId:
        game.Player2 = player

    return (game.ToJson()), 200

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

@NavalCrudApp.route("/game/<int:currentGameId>/grid/addboat", methods=['POST'])
@cross_origin()
def addBoatToGrid(currentGameId):
    game = _gameDataProvider.GetGameById(currentGameId)
    data = request.json
    boatToAddJson = data['boatToPlace']
    cellJson = data['cellJson']

    boatToAdd = Boat(boatName=boatToAddJson['boatName'], lenght=boatToAddJson['lenght'], orientation=boatToAddJson['orientation'], startCordinate=Cordinate(cellJson['x'], cellJson['y']))

    if game.Player1.Grid.CanPlaceBoat(boatToAdd):
        for availableBoat in game.Player1.Grid.AvailableBoats:
            if boatToAdd.Lenght == availableBoat.Lenght:
                game.Player1.Grid.AvailableBoats.remove(availableBoat)
                game.Player1.Grid.AddBoat(boatToAdd)
        if game.Player1.Grid.AvailableBoats == []:
            game.Player1.Ready = True
    else:
        return "can't add boat {}".format(boatToAdd), 400

    return (game.ToJson()), 200

@NavalCrudApp.route("/game/<int:currentGameId>/start/vsia", methods=['POST'])
@cross_origin()
def startGame(currentGameId):
    player2 = _playerDataProvider.AddPlayer("IA")
    player2 = _playerDataProvider.AddRandomBoats(player2.Id)
    print("player2 boats after addrandomBoats{}".format(player2.Grid.Boats))
    game = _gameDataProvider.AddPlayer2(currentGameId, player2)
    print("player2 boats after AddPlayerTOGame {}".format(game.Player2.Grid.Boats))

    game.GameState = GameStates.PLAYER1TURN
    print('player1 is {}'.format(game.Player1.ToJson()))
    print("player2 boats {}".format(game.Player2.Grid.Boats))
    return game.Player1.ToJson(), 200

@NavalCrudApp.route("/game/<int:gameId>/player/<int:playerId>/sendMissile", methods=['POST'])
@cross_origin()
def sendMissile(gameId, playerId):
    game = _gameDataProvider.GetGameById(gameId)
    data = request.json
    cordinate = Cordinate(data["cordinate"]["x"], data["cordinate"]["y"])

    player = _playerDataProvider.sendMissile(game, playerId, cordinate)

    if (game.GameState == GameStates.PLAYER1TURN):
        game.GameState = GameStates.PLAYER2TURN
    elif (game.GameState == GameStates.PLAYER2TURN):
        game.GameState = GameStates.PLAYER1TURN
    return ({"player": player.ToJson(), "gameStatus": game.GameState.value}), 200

@NavalCrudApp.route("/game/<int:gameId>/IAattack", methods=['PATCH'])
@cross_origin()
def IAattack(gameId):
    game = _gameDataProvider.GetGameById(gameId)
    player = _playerDataProvider.IaSendMissile(game)
    game.GameState = GameStates.PLAYER1TURN

    return ({"player": player.ToJson(), "gameStatus": game.GameState.value}), 200
