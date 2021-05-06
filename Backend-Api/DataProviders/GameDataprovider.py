from random import random

from Models import Context
from Models.Game import Game
from Models.Lobby import Lobby

class GameDataprovider(object):
    
    # when instatiate the class the context is passed in parameter, it should be the same context used by others dataproviders
    # def __init__(self, context = Context):
    #     self._Context = context

    _Context = Context

    def Add(self, gameName, player1, player2):
        id = len(self._Context.Games)

        newGame = Game(id, gameName, player1, player2)
        self._Context.Games.append(newGame)
        return newGame

    def GetGameById(self, id):
        findedGame = None
        for game in self._Context.Games:
            print(game)
            if game.Id == id:
                findedGame = game
        return findedGame
