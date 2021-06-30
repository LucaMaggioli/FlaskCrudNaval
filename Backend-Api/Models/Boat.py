from Models import Constants
from Models.Cordinate import Cordinate
from Models.Constants import HORIZONTAL, VERTICAL, CordinateStatus
from Models.Shape import Shape


class Boat(Shape):

    def __init__(self, boatName="", startCordinate=Cordinate(0, 0), lenght=0, orientation=VERTICAL):
        Shape.__init__(self, startCordinate=startCordinate, lenght=lenght, orientation=orientation)
        self.__BoatName = boatName
        self.__HittedCords = []


    def __SetCordinates(self):
        allCordinates = []
        if self.__Orientation is HORIZONTAL:
            for x in range(self.__StartCordinate.X, self.__StartCordinate.X + self.__Lenght):
                allCordinates.append(Cordinate(x, self.__StartCordinate.Y))
        else:
            for y in range(self.__StartCordinate.Y, self.__StartCordinate.Y + self.__Lenght):
                allCordinates.append(Cordinate(self.__StartCordinate.X, y))
        return allCordinates

    def ToJson(self):
        cordsToDict = []
        for cordinate in self.Cordinates:
            cordsToDict.append(cordinate.ToJson())
        return { "boatName": self.BoatName, "lenght": self.Lenght, "orientation": self.Orientation, "startCordinate": self.StartCordinate.ToJson(), "cordinates": cordsToDict}

    @property
    def IsSunk(self):
        return self.HittedCords.__len__() == self.Lenght

    def HitCord(self, cordinate):
        for cord in self.Cordinates:
            if cord.__eq__(cordinate):
                cord.Status = CordinateStatus.HIT
                self.HittedCords.append(cord)
        if self.IsSunk:
            for cord in self.Cordinates:
                cord.Status = CordinateStatus.SUNK

    @property
    def BoatName(self):
        return self.__BoatName

    @BoatName.setter
    def BoatName(self, newValue):
        self.__BoatName = newValue

    @property
    def HittedCords(self):
        return self.__HittedCords

    @HittedCords.setter
    def HittedCords(self, newValue):
        self.__HittedCords = newValue

