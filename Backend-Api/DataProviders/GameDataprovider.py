import random

from flask import jsonify

from Models import Context
from Models.Constants import VERTICAL, HORIZONTAL
from Models.Game import Game
from Models.Lobby import Lobby
from Models.Player import Player


class GameDataprovider(object):
    
    # when instatiate the class the context is passed in parameter, it should be the same context used by others dataproviders
    # def __init__(self, context = Context):
    #     self._Context = context

    _Context = Context

    def Add(self, gameName="DefaultNameGame", player1=Player(), player2=None):
        id = len(self._Context.Games) + 1 

        if (player2 is None):
            newGame = Game(id, gameName, player1)
        else:
            newGame = Game(id, gameName, player1, player2)
        self._Context.Games.append(newGame)
        return newGame

    def AddPlayer2(self, gameId, player2):
        game = self.GetGameById(gameId)
        game.Player2 = player2
        return game


    def GetGameById(self, id):
        findedGame = None
        for game in self._Context.Games:
            if game.Id == id:
                findedGame = game
                
        return findedGame

    def GetGames(self):
        games = []
        for game in self._Context.Games:
            games.append(game.ToJson())
        return games

    def GetGamesForPlayer(self, playerId):
        games = []
        for game in self._Context.Games:
            if game.Player1.Id == playerId or game.Player2.Id == playerId:
                games.append(game.ToJson())
        return games