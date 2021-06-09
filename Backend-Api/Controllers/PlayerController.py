import flask
from flask import request, jsonify, flash
from flask_cors import cross_origin

from FlaskApp import NavalCrudApp

from Models import Context
from DataProviders import PlayerDataProvider


_PlayerDataProvider = PlayerDataProvider


@NavalCrudApp.route("/player/add", methods=['POST'])
@cross_origin()
def addNewPlayer():
    playerNickname = request.json
    player = _PlayerDataProvider.addPlayer(playerNickname)
    print(player.ToJson())
    return player.ToJson(), 200


@NavalCrudApp.route("/players")
def playersHomepage():
    return flask.render_template("html/playersTemplate.html")

@NavalCrudApp.route("/players/all", methods=['GET'])
def getAllPlayers():
    return jsonify(_PlayerDataProvider.getAllPlayers()), 200

@NavalCrudApp.route("/players/player", methods=['GET'])
def getPlayersById():
    if 'Id' in request.args:
        id = int(request.args['Id'])
        player = _PlayerDataProvider.getPlayerById(id)
    else:
        return "Error: No id field provided. Please specify an id."
    return jsonify(player)

