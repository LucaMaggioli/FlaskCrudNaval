from Models.Grid import Grid

class Player(object):
    __id = 0
    __Id = 0
    __Nickname = ""
    __Grid = Grid(0)

    def __init__(self, nickname):
        self.__Id = self.__id+1
        self.__Nickname = nickname
        self.__Board = Grid(0)

    def __dict__(self):
        return {"Id":self.Id, "Nickname": self.__Nickname, "Grid":self.__Board.__dict__()}


    @property
    def Id(self):
        return self.__Id

    @property
    def Nickname(self):
        return self.__Nickname

    @property
    def Board(self):
        return self.__Grid

    @Board.setter
    def Board(self, value):
        self.__Board = value

