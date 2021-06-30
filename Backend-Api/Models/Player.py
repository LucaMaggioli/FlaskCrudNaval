    from Models.Grid import Grid

class Player(object):

    def __init__(self, id=-1, nickname=""):
        self.__Id = id
        self.__Nickname = nickname
        self.__Grid = Grid()
        self.__GridPlay = Grid()
        self.__LobbyOwner = False
        self.__Ready = False

    def ToJson(self):
        return {"id": self.Id, "nickname": self.Nickname, "lobbyOwner": self.LobbyOwner, "grid": self.Grid.ToJson(), "gridPlay":self.GridPlay.ToJson(), "ready": self.Ready}

    # Properties
    @property
    def Id(self):
        return self.__Id
    @Id.setter
    def Id(self, newValue):
        self.__Id = newValue
    @property
    def Nickname(self):
        return self.__Nickname
    @Nickname.setter
    def Nickname(self, newValue):
        self.__Nickname = newValue
    @property
    def Grid(self):
        return self.__Grid
    @Grid.setter
    def Grid(self, newValue):
        self.__Grid = newValue
    @property
    def GridPlay(self):
        return self.__GridPlay
    @GridPlay.setter
    def GridPlay(self, newValue):
        self.__GridPlay = newValue
    @property
    def LobbyOwner(self):
        return self.__LobbyOwner
    @LobbyOwner.setter
    def LobbyOwner(self, newValue):
        self.__LobbyOwner = newValue
    @property
    def Ready(self):
        return self.__Ready
    @Ready.setter
    def Ready(self, newValue):
        self.__Ready = newValue