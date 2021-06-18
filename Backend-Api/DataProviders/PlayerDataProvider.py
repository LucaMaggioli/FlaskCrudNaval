from flask import jsonify
import random

from Models import Context
from Models.Player import Player
from Models.Missile import Missile
from Models.Constants import VERTICAL, HORIZONTAL

_Context = Context

def getPlayerById(id):
    playerToReturn = None
    for player in _Context.Players:
        if player.Id == int(id):
            playerToReturn = player
    return playerToReturn

def addPlayer(_nickname):
    id = len(_Context.Players) + 1
    nickname = _nickname
    # player = dict({"id": id, "nickname": nickname, "lobbyOwner": False})
    player = Player(id, nickname)
    _Context.Players.append(player)
    return player

def AddRandomBoats(playerId):
    player = getPlayerById(playerId)
    player.Grid.ResetBoats()

    for availableBoat in player.Grid.AvailableBoats:
        randBoat = player.Grid.GetRandomBoat(boatName=availableBoat.BoatName, lenght=availableBoat.Lenght)

        while not player.Grid.CanPlaceBoat(randBoat):
            randBoat = player.Grid.GetRandomBoat(boatName=randBoat.BoatName, lenght=randBoat.Lenght)
        player.Grid.AddBoat(randBoat)
    player.Grid.AvailableBoats = []

    return player


def setLobbyOwner(playerId):
    print(type(playerId))
    print(playerId)
    intPlayerId = int(playerId)
    player = getPlayerById(intPlayerId)
    if player is None:
        # return player.__dict__()
        return dict({"id": playerId, "nickname": None, "lobbyOwner": None})
    # player['lobbyOwner'] = True
    player.LobbyOwner = True
    savePlayer(player)
    # return dict({"id": playerId, "nickname": player['nickname'], "lobbyOwner": player['lobbyOwner']})
    return player.ToJson()

def getAllPlayers():
    playersJsonized = []
    for player in _Context.Players:
        playersJsonized.append(player.ToJson())
    return playersJsonized

def savePlayer(player):
    playerIndex = _Context.Players.index(player)
    print(playerIndex)
    print(_Context.Players[playerIndex])
    _Context.Players[playerIndex] = player

def sendMissile(game, playerId, cordinate):
    print("into sendMissile PlayerDataPRovider")
    if playerId == game.Player1.Id:
        print("player 1 is attacking")
        if game.Player2.Grid.IsCordinateInsideGrid(cordinate):
            print("cordinate is inside grid")
            game.Player2.Grid.AddMissile(Missile(startCordinate=cordinate))
        #print("status of cord with missile = {}".format(game.Player2.Grid.GetCordById(cordinate.Id).Status))
            game.Player1.GridPlay.SetCordinateStatus(cordinate, game.Player2.Grid.GetCordById(cordinate.Id).Status)
    if playerId == game.Player2.Id:
        print("player 2 is attacking")
        game.Player1.Grid.AddMissile(Missile(cordinate))
        game.Player2.GridPlay.SetCordinateStatus(cordinate, game.Player1.Grid.GetCordById(cordinate.Id).Status)

    return game
