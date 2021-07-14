import string
import random

from Models import Context
from Models.Lobby import Lobby

_Context = Context

def newLobby(player):
    letters = string.ascii_lowercase + string.ascii_uppercase

    # lobbyId = len(_Context.Lobbys) + 1
    url = ''.join(random.choice(letters) for i in range(11))
    while not isUrlUnique(url):
        url = ''.join(random.choice(letters) for i in range(11))

    lobby = Lobby(url=url, host=player)
    _Context.Lobbys.append(lobby)

    return lobby

def joinLobby(url, player):
    lobby = getLobbyByUrl(url)
    if lobby is not None:
        lobby.Guest = player
    return lobby

def kickGuestFromLobby(url):
    lobby = getLobbyByUrl(url)
    lobby.Guest = None
    return lobby

def getLobbyByUrl(url):
    lobbyFound = None
    for lobby in _Context.Lobbys:
        if lobby.Url == url:
            lobbyFound = lobby

    return lobbyFound

def addPlayer2ToLobbyById(id, player2):
    lobby = getLobbyByUrl(id)
    lobby.Player2 = player2

    saveLobby(lobby)

def saveLobby(lobbyToSave):
    for lobby in _Context.Lobbys:
        if lobby.Id == lobbyToSave:
            lobby = lobbyToSave

def isUrlUnique(url):
    isUnique = True
    for lobby in _Context.Lobbys:
        if lobby.Url == url:
            isUnique = False
    return isUnique

    # allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"
    # code = ""
    # for x in range(0, 4):
    #     code += random.choice(allChar)