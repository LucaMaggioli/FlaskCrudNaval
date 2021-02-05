import flask
from flask import request
from FlaskApp import NavalCrudApp

@NavalCrudApp.route("/testTemplate")
def test():
    return flask.render_template("html/TestTemplate.html", token="Hello from Test COntroller")

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

@NavalCrudApp.route('/getGreetings', methods=['GET'])
def getGreetings():
    if request.method == "GET":
        say = request.args.get('say')
        to = request.args.get('to')
        content = "say: {}, to: {}".format(say,to)
        print(content)
        return flask.render_template("html/TestTemplate.html", token="received: {}".format(content))
    return flask.render_template("index.html", token="Error method is not Get")

