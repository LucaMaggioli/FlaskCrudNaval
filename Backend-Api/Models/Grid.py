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
        print("cordinates: x{} y{}, max x{} y{}".format(cordinate.X, cordinate.Y, self.CordinateMax.X, self.CordinateMax.Y))
        return cordinate.X <= self.CordinateMax.X and cordinate.Y <= self.CordinateMax.Y and cordinate.X >= 0 and cordinate.Y >= 0

    def CanPlaceBoat(self, boatToPlace=Boat()):
        result = True
        print(boatToPlace.ToJson())
        for boatToPlaceCordinate in boatToPlace.Cordinates:
            # print("cordinate of boat x{}, y{}, id {}, is inside grid".format(boatToPlaceCordinate.X, boatToPlaceCordinate.Y, boatToPlaceCordinate.Id))
            if not self.IsCordinateInsideGrid(boatToPlaceCordinate):
                result = False
            # print(result)

        for gridBoat in self.Boats:
            if boatToPlace.Overlap(gridBoat):
                result = False
        print('can place boat {} : {}'.format(boatToPlace.ToJson(), result))
        return result

    def GetCordById(self, cordId):
        cordFound = Cordinate()
        for cordinate in self.Cordinates:
            if cordinate.Id == cordId:
                cordFound = cordinate
        return cordFound


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
