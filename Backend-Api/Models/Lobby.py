from Models.Player import Player

# import random, string
# letters = string.ascii_lowercase + string.ascii_uppercase
# .join(random.choice(letters) for i in range(7, 11))

class Lobby(object):
    __Games = []
    def __init__(self, url='', host=Player(), guest=Player()):
        self.__Url = url
        self.__Host = host
        self.__Guest = guest


    def ToJson(self):
        return {"url": self.Url, "host": self.Host.ToJson(), "guest": self.Guest.ToJson()}

    @property
    def Url(self):
        return self.__Url
    @Url.setter
    def Url(self, newValue):
        self.__Url = newValue

    @property
    def Host(self):
        return self.__Host
    @Host.setter
    def Host(self, newValue):
        self.__Host = newValue

    @property
    def Guest(self):
        return self.__Guest
    @Guest.setter
    def Guest(self, newValue):
        self.__Guest = newValue

    # @property
    # def Games(self):
    #     return self.__Games
    # @Games.setter
    # def Games(self, newValue):
    #     self.__Games = newValue
