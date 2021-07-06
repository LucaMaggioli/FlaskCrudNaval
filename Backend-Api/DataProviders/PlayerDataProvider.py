from flask import jsonify
import random

from Models import Context, Constants
from Models.Constants import CordinateStatus
from Models.Cordinate import Cordinate
from Models.Player import Player
from Models.Missile import Missile

_Context = Context

def getPlayerById(id):
    playerToReturn = None
    for player in _Context.Players:
        if player.Id == int(id):
            playerToReturn = player
    return playerToReturn

def AddPlayer(_nickname):
    id = len(_Context.Players) + 1
    nickname = _nickname
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
    intPlayerId = int(playerId)
    player = getPlayerById(intPlayerId)
    if player is None:
        return dict({"id": playerId, "nickname": None, "lobbyOwner": None})
    player.LobbyOwner = True
    savePlayer(player)
    return player.ToJson()

def getAllPlayers():
    playersJsonized = []
    for player in _Context.Players:
        playersJsonized.append(player.ToJson())
    return playersJsonized

def savePlayer(player):
    playerIndex = _Context.Players.index(player)
    _Context.Players[playerIndex] = player

def sendMissile(game, playerId, cordinate):
    player = Player()
    if playerId == game.Player1.Id:
        if game.Player2.Grid.IsCordinateInsideGrid(cordinate):
            game.Player2.Grid.AddMissile(Missile(startCordinate=cordinate))
            game.Player1.GridPlay.SetCordinatesStatusesFromEnemyGrid(game.Player2.Grid)
        player = game.Player1
    if playerId == game.Player2.Id:
        game.Player1.Grid.AddMissile(Missile(startCordinate=cordinate))
        game.Player2.GridPlay.SetCordinatesStatusesFromEnemyGrid(game.Player1.Grid)
        player = game.Player2
    return player

def IaSendMissile(game):
    if game.Player1.Grid.LastHitCoordinate is not None:
        missileToAdd = getNextMissile(game.Player1.Grid.FirstHitCordinate, game.Player1.Grid.LastHitCoordinate, game.Player1.Grid.LastLaunchMissile, game.Player2.GridPlay)
    else:
        missileToAdd = getRandomMissile(game.Player1.Grid)

    game.Player1.Grid.AddMissile(missileToAdd)
    game.Player1.Grid = setLastHitCordinateInGrid(game.Player1.Grid, missileToAdd)
    game.Player2.GridPlay.SetCordinatesStatusesFromEnemyGrid(game.Player1.Grid) #Useless for Ia but we use it to know in gridPlay.Cordstatus is miss and  boat not sunk so the boat is in the opposite direction

    return game.Player1

def getNextMissile(EGfirstHitCordinate, EGlastHitCordinate, EGlastLaunchMissile, gridPlay):
    if gridPlay.HittingDirection is None:
        gridPlay.HittingDirection = Constants.Direction(random.randint(1, 4))

    nextCord = __GetNextCordFromCordAndDirection(EGlastLaunchMissile.StartCordinate, gridPlay.HittingDirection)
    cordInsideGrid = gridPlay.IsCordinateInsideGrid(nextCord)

    while not cordInsideGrid:
        gridPlay.HittingDirection = __GetOppositeDirection(gridPlay.HittingDirection)
        nextCord = __GetNextCordFromCordAndDirection(EGfirstHitCordinate, gridPlay.HittingDirection)
        cordInsideGrid = gridPlay.IsCordinateInsideGrid(nextCord)

    NextLaunchAlreadyDone = __IsNextLaunchAlreadyDone(EGlastLaunchMissile.StartCordinate, nextCord, gridPlay)

    while NextLaunchAlreadyDone:
        if EGlastHitCordinate.__eq__(EGfirstHitCordinate):
            gridPlay.HittingDirection = Constants.Direction(random.randint(1, 4))
        else:
            gridPlay.HittingDirection = __GetOppositeDirection(gridPlay.HittingDirection)
        nextCord = __GetNextCordFromCordAndDirection(EGfirstHitCordinate, gridPlay.HittingDirection)
        if gridPlay.GetStatusForExtCordinate(nextCord) == CordinateStatus.HIT:
            gridPlay.HittingDirection = Constants.Direction(random.randint(1, 4))
            nextCord = __GetNextCordFromCordAndDirection(nextCord, gridPlay.HittingDirection)

        NextLaunchAlreadyDone = __IsNextLaunchAlreadyDone(nextCord, nextCord, gridPlay)

    return Missile(startCordinate=nextCord)

def __IsNextLaunchAlreadyDone(lastLaunchCord, nextCord, gridPlay):
    LastLaunchIsMiss = gridPlay.GetStatusForExtCordinate(lastLaunchCord) == CordinateStatus.MISS
    NextLaunchIsMiss = gridPlay.GetStatusForExtCordinate(nextCord) == CordinateStatus.MISS
    NextLaunchIsSunk = gridPlay.GetStatusForExtCordinate(nextCord) == CordinateStatus.SUNK
    return LastLaunchIsMiss or NextLaunchIsSunk or NextLaunchIsMiss

def __GetNextCordFromCordAndDirection(cord, direction):
    nextCord = None
    if direction == Constants.Direction.N:
        nextCord = __GetNextCordOnYAxe(cord)
    if direction == Constants.Direction.E:
        nextCord = __GetNextCordOnXAxe(cord)
    if direction == Constants.Direction.S:
        nextCord = __GetPreCordOnYAxe(cord)
    if direction == Constants.Direction.W:
        nextCord = __GetPreCordOnXAxe(cord)
    return nextCord

def __GetNextCordOnXAxe(cordinate):
    return Cordinate(cordinate.X + 1, cordinate.Y)
def __GetNextCordOnYAxe(cordinate):
    return Cordinate(cordinate.X, cordinate.Y + 1)
def __GetPreCordOnXAxe(cordinate):
    return Cordinate(cordinate.X - 1, cordinate.Y)
def __GetPreCordOnYAxe(cordinate):
    return Cordinate(cordinate.X, cordinate.Y - 1)
def __GetOppositeDirection(direction):
    newDirection = 0
    if direction == Constants.Direction.N:
        newDirection = Constants.Direction.S
    if direction == Constants.Direction.E:
        newDirection = Constants.Direction.W
    if direction == Constants.Direction.S:
        newDirection = Constants.Direction.N
    if direction == Constants.Direction.W:
        newDirection = Constants.Direction.E
    return newDirection

def getRandomMissile(player1Grid):
    missile = Missile(startCordinate=Cordinate(random.randint(1, 10), random.randint(1, 10)))
    validMissile = False
    while not validMissile:
        statusForMissileCord = player1Grid.GetStatusForExtCordinate(missile.StartCordinate)
        if statusForMissileCord == CordinateStatus.MISS or statusForMissileCord == CordinateStatus.HIT or statusForMissileCord == CordinateStatus.SUNK:
            missile = Missile(startCordinate=Cordinate(random.randint(1, 10), random.randint(1, 10)))
        else:
            validMissile = True
    return missile

def setLastHitCordinateInGrid(grid, missile):
    statusForMissileCord = grid.GetStatusForExtCordinate(missile.StartCordinate)
    if statusForMissileCord == CordinateStatus.HIT:
        if grid.LastHitCoordinate is None:
            grid.FirstHitCordinate = missile.StartCordinate
        grid.LastHitCoordinate = missile.StartCordinate
    if statusForMissileCord == CordinateStatus.SUNK:
        if grid.FreeHitCord is not None:
            grid.LastHitCoordinate = grid.FreeHitCord
            grid.FirstHitCordinate = grid.FreeHitCord
        else:
            grid.LastHitCoordinate = None
            grid.FirstHitCordinate = None
    grid.LastLaunchMissile = missile

    return grid
