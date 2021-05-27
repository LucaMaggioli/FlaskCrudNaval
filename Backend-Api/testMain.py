from Models.Boat import Boat
from Models.Grid import Grid
from Models.Cordinate import Cordinate
from Models.Player import Player

gridSize = 7
cordinateMax = Cordinate(gridSize, gridSize)

# Grid
gridP1 = Grid()
print(gridP1.__dict__())
gridP1.CordinateMax = cordinateMax
print(gridP1.__dict__())

gridP2 = Grid(cordinateMax)

# Player 1
player1 = Player("Luca")
player1.Nickname = "Arthur"


print(player1.__dict__())
greatBoat = Boat("greatBoat 01-special", Cordinate(3, 4), 4, 1)
player1.Grid.Boats.append(greatBoat)
print(player1.__dict__())
player1.Grid.Boats.append(greatBoat)

player1.Id = 3
id = player1.Id


# Player 2



