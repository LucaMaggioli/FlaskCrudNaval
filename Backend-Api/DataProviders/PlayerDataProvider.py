from flask import jsonify
import random

from Models import Context
from Models.Player import Player
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

# def getLastPlayer():

# def getLastPlayerId():
#     return _Context.Players[len(_Context.Players)]['id']