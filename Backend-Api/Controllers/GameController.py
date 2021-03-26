import flask
from FlaskApp import NavalCrudApp


@NavalCrudApp.route('/startGame/vs/ia', methods=['GET'])
def startGamevsIa():

    return flask.render_template("html/gamePage.html", grid=grid, gridPlay=gridPlay)