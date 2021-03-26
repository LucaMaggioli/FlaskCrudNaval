from random import random

from Models import Context
from Models.Lobby import Lobby

_Context = Context

def newLobby(player1):
    lobbyId = len(_Context.Lobbys) + 1

    lobby = Lobby(lobbyId, player1)
    _Context.Lobbys.append(lobby)

    return lobby

def getLobbyById(id):
    lobbyFound = None
    for lobby in _Context.Lobbys:
        if lobby.Id == id:
            lobbyFound = lobby

    return lobbyFound

def addPlayer2ToLobbyById(id, player2):
    lobby = getLobbyById(id)
    lobby.Player2 = player2

    saveLobby(lobby)

def saveLobby(lobbyToSave):
    for lobby in _Context.Lobbys:
        if lobby.Id == lobbyToSave:
            lobby = lobbyToSave


    # allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"
    # code = ""
    # for x in range(0, 4):
    #     code += random.choice(allChar)