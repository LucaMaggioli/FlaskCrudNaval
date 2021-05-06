from Models import Context
from Models.Grid import Grid
# from Models.Lobby import Lobby


class GridDataprovider(object):
    # when instatiate the class the context is passed in parameter, it should be the same context used by others dataproviders
    # def __init__(self, context = Context):
    #     self._Context = context

    _Context = Context

    def Todo(self):
        print("todo")
