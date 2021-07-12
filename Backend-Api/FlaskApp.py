import flask
from flask_socketio import SocketIO, send

from DataProviders import PlayerDataProvider

NavalCrudApp = flask.Flask("__main__")#by default static folder is templates #, static_folder="../react-frontend/src" , static_folder="../react-frontend/build"
NavalCrudApp.secret_key = '_TPD?nonPDT,ah_PDT!Patate._)?^'  #secret key to avoid hacking

@NavalCrudApp.route("/")
def my_index():
    return flask.render_template("index.html", token="Hello from flask")

@NavalCrudApp.route("/homepage")
def homePage():
    return flask.render_template("homepage.html", message="")

@NavalCrudApp.route("/gridTemplate")
def gridTemplatePage():
    return flask.render_template("html/GridTemplate.html", token="Hello from flask")

socketIo = SocketIO(NavalCrudApp, cors_allowed_origins="*")
@socketIo.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    # return None
