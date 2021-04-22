from FlaskApp import NavalCrudApp
from Controllers import TestController
from Controllers import GridController
from Controllers import LobbyController
from Controllers import PlayerController
from Controllers import GameController

NavalCrudApp.run(debug=True, port=5555)