from Models.Grid import Grid

class Player(object):
    __id = 0
    __Id = 0
    __Nickname = ""
    __Grid = Grid(0)

    def __init__(self, nickname):
        self.__Nickname = nickname
        self.__Grid = Grid()
        self.__GridPlay = Grid()

    def __dict__(self):
        return {"Id":self.__id, "Nickname": self.__Nickname, "Grid": self.__Grid.__dict__()}

    # Getters
    @property
    def Nickname(self):
        return self.__Nickname
    @property
    def Grid(self):
        return self.__Grid
    @property
    def GridPlay(self):
        return self.__GridPlay

    # Setters
    @Nickname.setter
    def Nickname(self, newValue):
        self.__Nickname = newValue
    @Grid.setter
    def Grid(self, newValue):
        self.__Grid = newValue
    @GridPlay.setter
    def GridPlay(self, newValue):
        self.__Grid = newValue

