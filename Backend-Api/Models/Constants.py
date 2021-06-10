from enum import Enum

VERTICAL = 0
HORIZONTAL = 0

class CordinateStatus(Enum):
     WATER = 1
     BOAT = 2
     HIT = 3
     MISS = 4
     SUNK = 4

class GameStates(Enum):
     WAITING = -1
     PLACINGBOATS = 1
     PLAYING = 2
     PLAYER1TURN = 10
     PLAYER2TURN = 20

class GameMode(Enum):
     VSPLAYER = 1
     VSIA = 2