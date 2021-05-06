import flask
from flask import request
from flask_cors import cross_origin

from DataProviders.GameDataprovider import GameDataprovider
from FlaskApp import NavalCrudApp
from Models.Cordinate import Cordinate
from Models.Grid import Grid

_gameDataProvider = GameDataprovider()

@NavalCrudApp.route("/gridTemplate")
def gridTemplate():
    return flask.render_template("gridTemplate.html", token="Hello from Grid Controller")


@NavalCrudApp.route('/getGrid', methods=['GET'])
def getGridTemplate():
    if request.method == "GET":
        GridId = request.args.get('GridId')
        Grid = {"Id": GridId}
        print(GridId)
        return flask.render_template("html/GridTemplate.html", Grid="{}".format(Grid))
    return flask.render_template("index.html", token="Error method is not Get")


@NavalCrudApp.route('/grid', methods=['GET'])
@cross_origin()
def getGrid():
    result = Grid(10).ToJson()
    return result

@NavalCrudApp.route('/grid/addBoat', methods=['POST'])
@cross_origin()
def addBoat():
    return True

@NavalCrudApp.route('/grid/cell/check/<string:cellId>', methods=['PATCH'])
@cross_origin()
def getAvailableBoatsForCell(cellId):
    print("Entering in getCellAvailabelBoats")
    # gameId = request.args.get('GameId')
    data = request.json
    gameId = data['gameId']
    game = _gameDataProvider.GetGameById(gameId)
    print(game.ToJson())
    availableBoats = game.GameBoats
    grid = game.Player1.Grid

    cordinateFound = Cordinate(0,0)

    availableCords=[]

    for cordinate in grid.Cordinates:
        if cordinate.Id == cellId:
            cordinateFound = cordinate

    print(cordinateFound)
    for availableBoat in game.AvailableBoats:
        for l in range (0, availableBoat.Lenght):
            availableCord = Cordinate(cordinateFound.X + l, cordinateFound.Y)
            if grid.canContain(availableCord):
                availableCords.append(availableCord.ToJson())
        for l in range (0, availableBoat.Lenght):
            availableCord = Cordinate(cordinateFound.X, cordinateFound.Y + l)
            if grid.canContain(availableCord):
                availableCords.append(availableCord.ToJson())

    print(availableCords)
    return "yes"
