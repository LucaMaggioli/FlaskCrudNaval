from Models.Game import Game
from Models.Grid import Grid


class Context(object):
    __Lobbys = []

    def __init__(self):
        self.Id = 0

    @classmethod
    def SaveLobby(self, lobby):
        self.__Lobbys.append(lobby)

    def Lobbys(self):
        return self.__Lobbys
    #
    # @property
    # def Players(self):
    #     return self.__Players
    #
    # @property
    # def Games(self):
    #     return self.__Games
    #
    # def AddGame(self, game):
    #     self.__Games.append(game)
    #
    # def GetPlayerById(self, id):
    #     for player in self.__Players:
    #         if player.Id == id:
    #             return player
    #
    # def GetGameById(self, id):
    #     for game in self.__Games:
    #         if game.Id == id:
    #             return game

    ##################3

    # TODO
    @NavalCrudApp.route('/joinGame', methods=['GET'])
    def getGame():
        if request.method == "GET":
            gameId = request.args.get('GameId')
            return __Context.GetGameById(gameId)

    # TODO this method is for test the context that should contain all the lobbys
    @NavalCrudApp.route('/giveAllGames')
    def allGames():
        Games = []
        for lobby in __Context.Lobbys:
            Games = lobby.Games

        return flask.render_template("html/lobby.html", token=Games)

