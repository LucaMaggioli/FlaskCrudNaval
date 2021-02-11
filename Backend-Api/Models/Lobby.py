


class Lobby(object):
    __Games = []
    def addGame(self, game):
        self.__CurrentGame = game
        self.__Games.append(game)

    @property
    def CurrentGame(self):
        return self.__CurrentGame

    @property
    def Games(self):
        return self.__Games