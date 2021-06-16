import random

from Models import Constants
from Models.Boat import Boat
from Models.Cordinate import Cordinate
from Models.Constants import CordinateStatus

VERTICAL = 0
HORIZONTAL = 1

class Grid(object):

    _id = 0

    def __init__(self, size=10):
        cordinate = Cordinate(size, size)
        self.__CordinateMax = cordinate
        self.__Boats = []
        self.__Cordinates = []
        self.__SetCordinates()
        self.__Id = self._id
        self._id = self._id + 1
        self.__SetAvailableBoats()
        #self.__AvailableBoats = Constants.AVAILABLEGAMEBOATS

    def ToJson(self):
        boatsToDict = []
        availableBoatsToDict = []
        self.SetAvailableBoatsJson()

        for boat in self.Boats:
            boatsToDict.append(boat.ToJson())
        for boat in self.AvailableBoats:
            availableBoatsToDict.append(boat.ToJson())
        return {"cordMax": self.CordinateMax.ToJson(), "boats": boatsToDict, "availableBoats": availableBoatsToDict, "cordinates": self.CordinatesToJson()}

    def SetAvailableBoatsJson(self):
        self.__AvailableBoatsJson = []
        for boat in self.AvailableBoats:
            self.__AvailableBoatsJson.append(boat.ToJson())
    def __SetCordinates(self):
        for x in range(1, 11):
            for y in range(1, 11):
                self.__Cordinates.append(Cordinate(x, y))
    def __SetAvailableBoats(self):
        self.AvailableBoats = []
        for boat in Constants.AVAILABLEGAMEBOATS:
            self.AvailableBoats.append(Boat(boatName=boat["boatName"], lenght=boat["lenght"]))

    def CordinatesToJson(self):
        jsonCord = []
        for cordinate in self.Cordinates:
            jsonCord.append(cordinate.ToJson())
        return jsonCord

    def IsCordinateInsideGrid(self, cordinate):
        return cordinate.X <= self.CordinateMax.X and cordinate.Y <= self.CordinateMax.Y and cordinate.X >= 0 and cordinate.Y >= 0

    def CanPlaceBoat(self, boatToPlace=Boat()):
        result = True
        for boatToPlaceCordinate in boatToPlace.Cordinates:
            if not self.IsCordinateInsideGrid(boatToPlaceCordinate):
                result = False

        for gridBoat in self.Boats:
            if boatToPlace.Overlap(gridBoat):
                result = False
        return result

    def GetCordById(self, cordId):
        cordFound = Cordinate()
        for cordinate in self.Cordinates:
            if cordinate.Id == cordId:
                cordFound = cordinate
        return cordFound

    def ResetBoats(self):
        for boat in self.Boats:
            for boatCordinate in boat.Cordinates:
                for gridCordinate in self.Cordinates:
                    if gridCordinate.__eq__(boatCordinate):
                        gridCordinate.Status = CordinateStatus.WATER
        self.Boats = []
        self.__SetAvailableBoats()

    def AddBoat(self, boat=Boat()):

        for boatCordinate in boat.Cordinates:
            for gridCordinate in self.Cordinates:
                if gridCordinate.__eq__(boatCordinate):
                    gridCordinate.Status = CordinateStatus.BOAT

        self.__Boats.append(boat)

    def GetRandomBoat(self, boatName="", lenght=0):
        randOrientation = random.randrange(VERTICAL, HORIZONTAL + 1)
        if randOrientation == VERTICAL:
            cordY = random.randrange(1, self.CordinateMax.Y - lenght)
            cordX = random.randrange(1, 11)
        else:
            cordY = random.randrange(1, 11)
            cordX = random.randrange(1, self.CordinateMax.X - lenght)
        return Boat(boatName=boatName, startCordinate=Cordinate(cordX, cordY), lenght=lenght, orientation=randOrientation)

    @property
    def Id(self):
        return self.__Id
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

    @property
    def AvailableBoats(self):
        return self.__AvailableBoats

    @AvailableBoats.setter
    def AvailableBoats(self, newValue):
        self.__AvailableBoats = newValue
