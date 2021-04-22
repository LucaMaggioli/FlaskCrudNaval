import flask
from flask import request
from flask_cors import cross_origin

from FlaskApp import NavalCrudApp
from Models.Grid import Grid

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