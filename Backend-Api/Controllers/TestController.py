import flask
from flask import request
from FlaskApp import NavalCrudApp

@NavalCrudApp.route("/grid")
def grid():
    return flask.render_template("index.html", token="Hello from Grid COntroller")

@NavalCrudApp.route('/postjson', methods = ['GET', 'POST'])
def postJsonHandler():
    if request.method == "POST":
        print("hello")
        print(request.is_json)
        content = request.get_json()
        print(content)
        return flask.render_template("index.html", token="Json data received: {}".format(content))
    if request.method == "GET":
        print("Hello Get")

