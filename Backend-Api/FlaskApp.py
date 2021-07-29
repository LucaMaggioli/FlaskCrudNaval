import flask
import os
from flask import send_from_directory
from flask_socketio import SocketIO, send

from DataProviders import PlayerDataProvider

NavalCrudApp = flask.Flask("__main__", static_folder="../frontend-web/build")#by default static folder is templates #, static_folder="../react-frontend/src" , static_folder="../react-frontend/build"
NavalCrudApp.secret_key = '_TPD?nonPDT,ah_PDT!Patate._)?^'  #secret key to avoid hacking


@NavalCrudApp.route('/', defaults={'path': ''})
@NavalCrudApp.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(NavalCrudApp.static_folder + '/' + path):
        return send_from_directory(NavalCrudApp.static_folder, path)
    else:
        return send_from_directory(NavalCrudApp.static_folder, 'index.html')
# @NavalCrudApp.route("/")
# def my_index():
#     return flask.render_template("index.html", token="Hello from flask")

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
