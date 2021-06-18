from Models.Cordinate import Cordinate
from Models.Shape import Shape


class Missile(Shape) :
    def __init__(self, id=-1, startCordinate=Cordinate(0, 0)):
        Shape.__init__(self, startCordinate=startCordinate, lenght=1, orientation=1)
        self.__Id = id

    def ToJson(self):
        return {"id": self.Id, "startCordinate": self.StartCordinate.ToJson()}

    @property
    def Id(self):
        return self.__Id