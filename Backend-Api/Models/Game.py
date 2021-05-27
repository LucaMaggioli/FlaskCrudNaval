from Models.Boat import Boat
from Models.Cordinate import Cordinate

class Game(object):

    def __init__(self, id, gameName, player1, player2):
        self.__Id = id
        self.__Player1 = player1
        self.__Player2 = player2
        self.__GameName = gameName
        self.__GameState = -1

    def ToJson(self):
        return {"id": self.Id, "name": self.GameName, "gameState": self.GameState, "player1": self.Player1.ToJson(), "player2": self.Player2.ToJson()}

    @property
    def Id(self):
        return self.__Id

    @property
    def Player1(self):
        return self.__Player1

    @Player1.setter
    def Player1(self, newValue):
        self.__Player1 = newValue

    @property
    def Player2(self):
        return self.__Player2

    @Player2.setter
    def Player2(self, newValue):
        self.__Player2 = newValue

    @property
    def GameName(self):
        return self.__GameName

    @GameName.setter
    def GameName(self, newValue):
        self.__GameName = newValue

    @property
    def GameState(self):
        return self.__GameState

    @GameState.setter
    def GameState(self, newValue):
        self.__GameState = newValue