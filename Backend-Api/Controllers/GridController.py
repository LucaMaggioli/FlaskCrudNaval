import flask
from FlaskApp import NavalCrudApp

@NavalCrudApp.route("/grid")
def grid():
    return flask.render_template("index.html", token="Hello from Grid COntroller")
