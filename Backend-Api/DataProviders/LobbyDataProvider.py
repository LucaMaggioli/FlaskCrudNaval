from random import random

from Models import Context

_Context = Context

def createLobby(player1):
    allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"
    code = ""
    for x in range(0, 4):
        code += random.choice(allChar)
    # ==============================

    lobbyId = len(_Context.Lobbys) + 1
    lobby = {'id': lobbyId, 'player1': player1, 'player2': None}
    _Context.Lobbys.append(lobby)
    return lobby