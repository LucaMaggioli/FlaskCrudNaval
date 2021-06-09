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
        id = len(self._Context.Games)

        if (player2 is None):
            newGame = Game(id, gameName, player1)
        else:
            newGame = Game(id, gameName, player1, player2)
        self._Context.Games.append(newGame)
        return newGame

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

    def AddRandomBoats(self, id, player):
        # def PlaceRandomBoats(self):
        global grid
        game = self.GetGameById(id)
        print(game.Player1.Grid.Boats)
        print(game.Player2.Grid.Boats)
        if player == 1:
            grid = game.Player1.Grid
        if player == 2:
            grid = game.Player2.Grid
        boats = []
        # print('entering randomBoat, grid id is {}'.format(self.Id))

        for availableBoat in grid.AvailableBoats:
            randOrientation = random.randrange(VERTICAL, HORIZONTAL + 1)
            randBoat = grid.GetRandomBoat(boatName=availableBoat.BoatName, lenght=availableBoat.Lenght,
                                          orientation=randOrientation)
            boats.append(randBoat)

        for boat in boats:
            while not grid.CanPlaceBoat(boat):
                randOrientation = random.randrange(VERTICAL, HORIZONTAL + 1)
                boat = grid.GetRandomBoat(boatName=boat.BoatName, lenght=boat.Lenght,
                                          orientation=randOrientation)
            grid.AddBoat(boat)

        for boat in grid.Boats:
            print(boat.ToJson())

        print(game.Player1.Grid.Boats)
        print(game.Player2.Grid.Boats)
        return game
