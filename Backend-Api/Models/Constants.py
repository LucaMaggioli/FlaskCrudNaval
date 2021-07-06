from enum import Enum

VERTICAL = 0
HORIZONTAL = 1

#AVAILABLEGAMEBOATS = [Boat(boatName="torpilleur-1", lenght=3), Boat(boatName="torpilleur-2", lenght=3), Boat(boatName="contre-avion", lenght=4), Boat(boatName="porte-avion", lenght=5)]
AVAILABLEGAMEBOATS = [{"boatName": "torpilleur-1", "lenght": 3}, {"boatName": "torpilleur-2", "lenght": 3}, {"boatName": "contre-avion", "lenght": 4}, {"boatName": "porte-avion", "lenght": 5}]

class Direction(Enum):
     N = 1
     E = 2
     S = 3
     W = 4

class CordinateStatus(Enum):
     WATER = 1
     BOAT = 2
     HIT = 3
     MISS = 4
     SUNK = 5

class GameStates(Enum):
     WAITING = -1
     PLACINGBOATS = 1
     PLAYING = 2
     PLAYER1TURN = 10
     PLAYER2TURN = 20

class GameMode(Enum):
     VSPLAYER = 1
     VSIA = 2