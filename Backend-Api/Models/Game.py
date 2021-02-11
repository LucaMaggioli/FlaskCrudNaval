

class Game(object):
    __Id = 0
    __Players = []

    def __init__(self, id, player1, player2):
        self.__Id = id
        self.__Player1 = player1
        self.__Player2 = player2

    @property
    def Id(self):
        return self.__Id

    @property
    def Players(self):
        return self.__Players

    def ToJSON(self):
        json = {"Id":self.Id, "Player1":self.__Player1.ToJSON, "Player2":self.__Player2.ToJSON}
        return json

    def __dict__(self):
        return {"Id":self.Id, "Player1":self.__Player1.__dict__(), "Player2":self.__Player2.__dict__()}
