import flask
from flask import request, jsonify, flash
from FlaskApp import NavalCrudApp

from Models import Context
from DataProviders import PlayerDataProvider

PLAYERS = "/players"

_PlayerDataProvider = PlayerDataProvider

@NavalCrudApp.route(PLAYERS)
def playersHomepage():
    return flask.render_template("html/playersTemplate.html")

@NavalCrudApp.route(PLAYERS+"/all", methods=['GET'])
def getAllPlayers():
    return jsonify(_PlayerDataProvider.getAllPlayers()), 200

@NavalCrudApp.route(PLAYERS+"/player", methods=['GET'])
def getPlayersById():
    if 'Id' in request.args:
        id = int(request.args['Id'])
        player = _PlayerDataProvider.getPlayerById(id)
    else:
        return "Error: No id field provided. Please specify an id."
    return jsonify(player)

@NavalCrudApp.route(PLAYERS+"/add", methods=['POST'])
def addNewPlayer():
    if request.method == "POST":
        pNickname = request.form["pNickname"]
        if pNickname:
            player = _PlayerDataProvider.addPlayer(pNickname)
            return flask.render_template("html/playerPage.html", player=player)
        else:
            return flask.render_template("homepage.html", message="Nickname could not be null")
