

class Game(object):

    def __init__(self, id, player1, player2):
        self.__Id = id
        self.__Player1 = player1
        self.__Player2 = player2

    def ToJson(self):
        return {"Id": self.Id, "Player1": self.__Player1.ToJson(), "Player2": self.__Player2.ToJson()}

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
