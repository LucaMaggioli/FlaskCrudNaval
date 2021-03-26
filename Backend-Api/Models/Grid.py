from Models.Cordinate import Cordinate


class Grid(object):

    def __init__(self, size = 10):
        cordinate = Cordinate(size, size)
        self.__CordinateMax = cordinate
        self.__Boats = []

    def ToJson(self):
        boatsToDict = []
        for boat in self.__Boats:
            boatsToDict.append(boat.ToJson())
        return {"CordMax": self.__CordinateMax.ToJson(), "Boats": boatsToDict}

    @property
    def CordinateMax(self):
        return self.__CordinateMax

    @CordinateMax.setter
    def CordinateMax(self, newValue):
        self.__CordinateMax = newValue

    @property
    def Boats(self):
        return self.__Boats
    @Boats.setter
    def Boats(self, newValue):
        self.__Boats = newValue
