import flask
from flask import request, jsonify
from flask import Response
from flask_cors import cross_origin

from DataProviders.GameDataprovider import GameDataprovider
from FlaskApp import NavalCrudApp
from Models.Boat import Boat
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
    if game is None:
        return Response("Game not found", status=201, mimetype='application/json')
    print(game.ToJson())
    grid = game.Player1.Grid

    availableCords={}

    startCordinate = grid.GetCordById(cellId)

    print(startCordinate)
    possibleBoats = game.GetPossibleBoatsForCord(startCordinate)
    jsonPossibleBoats = []
    for boat in possibleBoats:
        print("possible boat is: {}".format(boat.ToJson()))
        if grid.CanPlaceBoat(boat):
            jsonPossibleBoats.append(boat.ToJson())
    #
    #
    # for availableBoat in game.AvailableBoats:
    #     possibleBoatVertical = Boat(startCordinate=startCordinate, lenght=availableBoat.Lenght, orientation=VERTICAL)
    #     possibleBoatHorizontal = Boat(startCordinate=startCordinate, lenght=availableBoat.Lenght, orientation=HORIZONTAL)
    #
    #     for x in range (0, availableBoat.Lenght):
    #         availableCord = Cordinate(startCordinate.X + l, startCordinate.Y)
    #         if grid.canContain(availableCord):
    #             # availableCords.append({"cord":availableCord.ToJson()})
    #             availableCords[availableCord.Id] = availableCord.ToJson()
    #     for l in range (0, availableBoat.Lenght):
    #         availableCord = Cordinate(startCordinate.X, startCordinate.Y + l)
    #         if grid.canContain(availableCord):
    #             # availableCords.append({"cord":availableCord.ToJson()})
    #             availableCords[availableCord.Id] = availableCord.ToJson()
    #
    # print(availableCords)
    return jsonify(jsonPossibleBoats)
