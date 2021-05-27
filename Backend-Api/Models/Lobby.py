from Models.Player import Player


class Lobby(object):
    __Games = []
    def __init__(self, id, player1):
        self.__Id = id
        self.__Player1 = player1
        self.__Player2 = None


    def ToJson(self):
        return {"id": self.__Id, "player1": self.__Player1, "player2": self.__Player2}

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
    def Games(self):
        return self.__Games
    @Games.setter
    def Games(self, newValue):
        self.__Games = newValue


    # def addGame(self, game):
#     self.__CurrentGame = game
#     self.__Games.append(game)