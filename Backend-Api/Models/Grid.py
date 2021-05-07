from Models.Boat import Boat
from Models.Cordinate import Cordinate


class Grid(object):

    def __init__(self, size = 10):
        cordinate = Cordinate(size, size)
        self.__CordinateMax = cordinate
        self.__Boats = []
        self.__Cordinates = []
        self.setCordinates()

    def ToJson(self):
        boatsToDict = []
        for boat in self.__Boats:
            boatsToDict.append(boat.ToJson())
        return {"cordMax": self.CordinateMax.ToJson(), "boats": boatsToDict, "cordinates": self.CordinatesToJson()}

    def CordinatesToJson(self):
        jsonCord = []
        for cordinate in self.Cordinates:
            jsonCord.append(cordinate.ToJson())
        return jsonCord

    def IsCordinateInsideGrid(self, cordinate):
        return cordinate.X <= self.CordinateMax.X and cordinate.Y <= self.CordinateMax.Y

    def CanPlaceBoat(self, boatToPlace=Boat()):
        response = True

        for boatToPlaceCordinate in boatToPlace.Cordinates:
            if self.IsCordinateInsideGrid(boatToPlaceCordinate):
                response = False

        for gridBoat in self.Boats:
            if boatToPlace.Overlap(gridBoat):
                response = False

        return response

    def setCordinates(self):
        for x in range(0,10):
            for y in range(0, 10):
                self.__Cordinates.append(Cordinate(x,y))

    @property
    def Cordinates(self):
        return self.__Cordinates

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
