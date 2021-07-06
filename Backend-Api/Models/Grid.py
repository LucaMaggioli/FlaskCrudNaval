import random

from Models import Constants
from Models.Boat import Boat
from Models.Cordinate import Cordinate
from Models.Constants import CordinateStatus
from Models.Missile import Missile

VERTICAL = 0
HORIZONTAL = 1

class Grid(object):
    def __init__(self, size=10, id=-1):
        cordinate = Cordinate(size, size)
        self.__CordinateMax = cordinate
        self.__Boats = []
        self.__Missiles = []
        self.__Cordinates = []
        self.__SetCordinates()
        self.__Id = id
        self.__SetAvailableBoats()
        self.__LastHitCoordinate = None
        self.__FirstHitCordinate = None
        self.__HittingDirection = None
        self.__LastLaunchMissile = Missile(startCordinate=Cordinate(-2, -2))

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
        return cordinate.X <= self.CordinateMax.X and cordinate.Y <= self.CordinateMax.Y and cordinate.X > 0 and cordinate.Y > 0

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

    def AddMissile(self, missileToAdd=Missile()):
        for gridCordinate in self.Cordinates:
            if gridCordinate.__eq__(missileToAdd.StartCordinate):
                if gridCordinate.Status == CordinateStatus.WATER:
                    gridCordinate.Status = CordinateStatus.MISS
                if gridCordinate.Status == CordinateStatus.BOAT:
                    gridCordinate.Status = CordinateStatus.HIT
                    boatHitted = self.GetBoatOverlappedBy(missileToAdd)
                    boatHitted.HitCord(gridCordinate)
                    if boatHitted.IsSunk:
                        self.SetSunkBoatCellsStatusInGrid(boatHitted)
        self.Missiles.append(missileToAdd)

    def SetSunkBoatCellsStatusInGrid(self, boatSunk):
        for cord in self.Cordinates:
            for bCord in boatSunk.Cordinates:
                if cord.__eq__(bCord):
                    cord.Status = CordinateStatus.SUNK

    #Unused if in future is not usefull is TODO delete method
    def SetCordinateStatus(self, cordinate, status):
        for gridCord in self.Cordinates:
            if gridCord.__eq__(cordinate):
                gridCord.Status = status

    def SetCordinatesStatusesFromEnemyGrid(self, gridToCopyStatus):
        for cord in gridToCopyStatus.Cordinates:
            for selfCord in self.Cordinates:
                if selfCord.__eq__(cord):
                    if cord.Status == CordinateStatus.BOAT:
                        selfCord.Status = CordinateStatus.WATER
                    else:
                        selfCord.Status = cord.Status

    def GetBoatOverlappedBy(self, shape):
        boatOverlapped = None
        for boat in self.Boats:
            if shape.Overlap(boat):
                boatOverlapped = boat
        return boatOverlapped

    def CheckIfOverlapAnyBoat(self, shape):
        overlap = False
        for boat in self.Boats:
            if shape.Overlap(boat):
                overlap = True
        return overlap

    def IsBoatSunk(self, boat):
        hits = 0
        for bCord in boat.Cordinates:
            for cord in self.Cordinates:
                if cord.__eq__(bCord):
                    if cord.Status == Constants.CordinateStatus.HIT:
                        hits += 1
        return hits == boat.Lenght

    def GetRandomBoat(self, boatName="", lenght=0):
        randOrientation = random.randrange(VERTICAL, HORIZONTAL + 1)
        if randOrientation == VERTICAL:
            cordY = random.randrange(1, self.CordinateMax.Y - lenght)
            cordX = random.randrange(1, 11)
        else:
            cordY = random.randrange(1, 11)
            cordX = random.randrange(1, self.CordinateMax.X - lenght)
        return Boat(boatName=boatName, startCordinate=Cordinate(cordX, cordY), lenght=lenght, orientation=randOrientation)

    def GetStatusForExtCordinate(self, extCordinate):
        statusToReturn = None
        for cordinate in self.Cordinates:
            if cordinate.__eq__(extCordinate):
                statusToReturn = cordinate.Status
        return statusToReturn

    @property
    def FreeHitCord(self):
        freeCord = None
        for cord in self.Cordinates:
            if self.GetStatusForExtCordinate(cord) == CordinateStatus.HIT:
                freeCord = cord
        return freeCord

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
    def Missiles(self):
        return self.__Missiles

    @Missiles.setter
    def Missiles(self, newValue):
        self.__Missiles = newValue

    @property
    def AvailableBoats(self):
        return self.__AvailableBoats

    @AvailableBoats.setter
    def AvailableBoats(self, newValue):
        self.__AvailableBoats = newValue

    @property
    def LastHitCoordinate(self):
        return self.__LastHitCoordinate

    @LastHitCoordinate.setter
    def LastHitCoordinate(self, newValue):
        self.__LastHitCoordinate = newValue

    @property
    def LastLaunchMissile(self):
        return self.__LastLaunchMissile

    @LastLaunchMissile.setter
    def LastLaunchMissile(self, newValue):
        self.__LastLaunchMissile = newValue

    @property
    def HittingDirection(self):
        return self.__HittingDirection

    @HittingDirection.setter
    def HittingDirection(self, newValue):
        self.__HittingDirection = newValue
    @property
    def FirstHitCordinate(self):
        return self.__FirstHitCordinate

    @FirstHitCordinate.setter
    def FirstHitCordinate(self, newValue):
        self.__FirstHitCordinate = newValue