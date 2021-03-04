import flask
from flask import request, jsonify, flash
from FlaskApp import NavalCrudApp

PLAYERS = "/players"
players = [
    {
        'id': 0,
        'nickName': 'Ryan09'
    },
    {
        'id': 1,
        'nickName': 'Bryan07'
    },
    {
        'id': 1,
        'nickName': 'Morgan03'
    }
]

@NavalCrudApp.route(PLAYERS)
def playersHomepage():
    return flask.render_template("html/playersTemplate.html")

@NavalCrudApp.route(PLAYERS+"/all", methods=['GET'])
def getAllPlayers():
    return jsonify(players), 200

@NavalCrudApp.route(PLAYERS+"/player", methods=['GET'])
def getPlayersById():
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display an error in the browser.
    if 'Id' in request.args:
        id = int(request.args['Id'])
    else:
        return "Error: No id field provided. Please specify an id."

    # Create an empty list for our results
    results = []

    # Loop through the data and match results that fit the requested ID.
    # IDs are unique, but other fields might return many results
    for player in players:
        if player['id'] == id:
            results.append(player)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)


#TODO For this method you need js to put the id into the url -> /players/player/<id>
@NavalCrudApp.route(PLAYERS+"/player/<int:Id>", methods=['GET'])
def getPlayersByIdParam(id):
    if id:
        _id = id
    else:
        return "Error, Id not provided"

    results = []
    for player in players:
        if player['id'] == id:
            results.append(player)

    return jsonify(results)

@NavalCrudApp.route(PLAYERS+"/player/save", methods=['POST'])
def saveNewPlayer():
    if request.method == "POST":
        pId =  int(request.form["pId"])
        pNickname = request.form["pNickname"]

        players.append({'id': pId, 'nickname': pNickname})
        # TODO flash("New Player succesfull added", "Sucess")

    return flask.redirect(PLAYERS)

