from Models import Context

_Context = Context

def getPlayerById(id):
    playerToReturn = None
    for player in _Context.Players:
        if player['id'] == id:
            playerToReturn = player
    return playerToReturn

def addPlayer(_nickname):
    id = len(_Context.Players) + 1
    nickname = _nickname
    player = {'id': id, 'nickname': nickname, 'lobbyOwner': False}
    _Context.Players.append(player)
    return player

def setLobbyOwner(playerId):
    print(type(playerId))
    print(playerId)
    intoPlayerId = int(playerId)
    player = getPlayerById(intoPlayerId)
    player['lobbyOwner'] = True

def getAllPlayers():
    return _Context.Players

# def getLastPlayer():

# def getLastPlayerId():
#     return _Context.Players[len(_Context.Players)]['id']