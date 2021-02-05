import flask
from flask import request
from FlaskApp import NavalCrudApp

@NavalCrudApp.route("/gridTemplate")
def grid():
    return flask.render_template("gridTemplate.html", token="Hello from Grid Controller")


@NavalCrudApp.route('/getGrid', methods=['GET'])
def getGrid():
    if request.method == "GET":
        GridId = request.args.get('GridId')
        Grid = {"Id": GridId}
        print(GridId)
        return flask.render_template("html/GridTemplate.html", Grid="{}".format(Grid))
    return flask.render_template("index.html", token="Error method is not Get")

# print(request.is_json)
# content = request.get_json()