import flask
from flask import request, jsonify
from flask_cors import cross_origin
from flask_socketio import emit


from DataProviders import PlayerDataProvider
from DataProviders.GameDataprovider import GameDataprovider
from FlaskApp import NavalCrudApp
from Models.Boat import Boat
from Models.Cordinate import Cordinate
from Models.Game import Game
from Models.Player import Player
from Models.Grid import Grid
from Models.Constants import GameStatuses, GameMode

_gameDataProvider = GameDataprovider()
_playerDataProvider = PlayerDataProvider

#Call this endpoint to start a game vs IA
@NavalCrudApp.route('/game/create/player/<int:playerId>/vsia', methods=['POST'])
@cross_origin()
def startGamevsIa(playerId):
    player1 = _playerDataProvider.getPlayerById(playerId)
    game = _gameDataProvider.Add(player1=player1)#TODO: add the game name from the frontend
    return game.ToJson(), 200


@NavalCrudApp.route("/games", methods=['GET'])
@cross_origin()
def getGames():
    return jsonify(_gameDataProvider.GetGames())

@NavalCrudApp.route("/games/player/<int:playerId>", methods=['GET'])
@cross_origin()
def getGamesForPlayer(playerId):
    games = _gameDataProvider.GetArchivedGamesForPlayer(playerId)
    for game in games:
        print("Boats for archived game for player1")
        print(game["player1"]["grid"]["boats"])
    print("Games of player id {}".format(playerId))
    print(games)
    return jsonify(games)

@NavalCrudApp.route("/game/<int:gameId>", methods=['GET'])
@cross_origin()
def getGameById(gameId):
    game = _gameDataProvider.GetGameById(gameId)
    return game.ToJson(), 200


# Call this endpoint to start a game player vs player
@NavalCrudApp.route("/game/<int:player1Id>/vs/<int:player2Id>", methods=['POST'])
@cross_origin()
def createGameVsPlayer(player1Id, player2Id):
    player1 = _playerDataProvider.getPlayerById(player1Id)
    player2 = _playerDataProvider.getPlayerById(player2Id)
    gameName = ("Game of {} VS {}".format(player1.Nickname, player2.Nickname))

    game = _gameDataProvider.Add(gameName, player1, player2)
    game.GameState = GameStatuses.PLACINGBOATS

    emit("createGame", game.ToJson(), room=player1.SessionId, namespace='/connect')
    emit("createGame", game.ToJson(), room=player2.SessionId, namespace='/connect')


    return game.ToJson(), 200

@NavalCrudApp.route("/game/<int:gameId>/leave/player/<int:playerId>", methods=['PATCH'])
@cross_origin()
def leaveGame(gameId, playerId):
    game = _gameDataProvider.GetGameById(gameId)

    _gameDataProvider.SetLoserForGame(game, playerId)
    _gameDataProvider.FinishGame(game)

    player = _playerDataProvider.getPlayerById(playerId)
    player.Grid = Grid()
    player.GridPlay = Grid()

    return player.ToJson(), 200

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

    return (player.ToJson()), 200

@NavalCrudApp.route("/game/<int:currentGameId>/player/<int:playerId>/addboat", methods=['POST'])
@cross_origin()
def addBoatToGrid(currentGameId, playerId):
    game = _gameDataProvider.GetGameById(currentGameId)
    data = request.json
    boatToAddJson = data['boatToPlace']
    cellJson = data['cellJson']

    boatToAdd = Boat(boatName=boatToAddJson['boatName'], lenght=boatToAddJson['lenght'], orientation=boatToAddJson['orientation'], startCordinate=Cordinate(cellJson['x'], cellJson['y']))

    player = _playerDataProvider.getPlayerById(playerId)

    if player.Grid.CanPlaceBoat(boatToAdd):
        for availableBoat in player.Grid.AvailableBoats:
            if boatToAdd.Lenght == availableBoat.Lenght:
                player.Grid.AvailableBoats.remove(availableBoat)
                player.Grid.AddBoat(boatToAdd)
        if player.Grid.AvailableBoats == []:
            player.Ready = True
    else:
        return "can't add boat {}".format(boatToAdd), 400

    if game.Player1.Id == playerId:
        game.Player1 = player
    if game.Player2.Id == playerId:
        game.Player2 = player

    return (player.ToJson()), 200

@NavalCrudApp.route("/game/<int:gameId>/<int:playerId>/ready", methods=["GET"])
@cross_origin()
def startGame(gameId, playerId):
    game = _gameDataProvider.GetGameById(gameId)

    player = _playerDataProvider.getPlayerById(playerId)
    player.Ready = True

    if game.Player1.Id == playerId:
        game.Player1 = player
        if game.Player2.Ready:
            game.GameState = GameStatuses.PLAYER2TURN
            emit("startGame", {"player": game.Player1.ToJson(), "gameState": game.GameState.value}, room=game.Player1.SessionId, namespace='/connect')
            emit("startGame", {"player": game.Player2.ToJson(), "gameState": game.GameState.value}, room=game.Player2.SessionId, namespace='/connect')
    if game.Player2.Id == playerId:
        game.Player2 = player
        if game.Player1.Ready:
            game.GameState = GameStatuses.PLAYER1TURN
            emit("startGame", {"player": game.Player1.ToJson(), "gameState": game.GameState.value}, room=game.Player1.SessionId, namespace='/connect')
            emit("startGame", {"player": game.Player2.ToJson(), "gameState": game.GameState.value}, room=game.Player2.SessionId, namespace='/connect')


    # Check if players are ready
    # Set the status of the game to PLAYERTURN
    # find player 2 and send a websocket with his player(so with grid and gridplay to display in GameView
    # return player1 game
    # return game.Player1.ToJson(), 200
    return {"message": "ok"}, 200

@NavalCrudApp.route("/game/<int:currentGameId>/start/vsia", methods=['POST'])
@cross_origin()
def startGameVsIa(currentGameId):
    player2 = _playerDataProvider.AddPlayer("IA", sessionId="")
    player2 = _playerDataProvider.AddRandomBoats(player2.Id)
    game = _gameDataProvider.AddPlayer2(currentGameId, player2)

    game.GameState = GameStatuses.PLAYER1TURN
    return game.Player1.ToJson(), 200

@NavalCrudApp.route("/game/<int:gameId>/player/<int:playerId>/sendMissile", methods=['POST'])
@cross_origin()
def sendMissile(gameId, playerId):
    game = _gameDataProvider.GetGameById(gameId)
    data = request.json
    cordinate = Cordinate(data["cordinate"]["x"], data["cordinate"]["y"])

    player = _playerDataProvider.sendMissile(game, playerId, cordinate)

    if game.Player1.Id == playerId:
        emit("nextTurn", {"player": game.Player2.ToJson(), "gameState": game.GameState.value}, room=game.Player2.SessionId, namespace='/connect')
    if game.Player2.Id == playerId:
        emit("nextTurn", {"player": game.Player1.ToJson(), "gameState": game.GameState.value}, room=game.Player1.SessionId, namespace='/connect')

    return ({"player": player.ToJson(), "gameStatus": game.GameState.value}), 200

@NavalCrudApp.route("/game/<int:gameId>/IAattack", methods=['PATCH'])
@cross_origin()
def IAattack(gameId):
    game = _gameDataProvider.GetGameById(gameId)
    player = _playerDataProvider.IaSendMissile(game)

    return ({"player": player.ToJson(), "gameStatus": game.GameState.value}), 200
