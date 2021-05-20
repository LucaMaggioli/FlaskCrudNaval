from Models.Cordinate import Cordinate

VERTICAL = 0
HORIZONTAL = 1

class Boat(object):

    def __init__(self, boatName = "", startCordinate=Cordinate(0, 0), lenght=0, orientation=VERTICAL):
        self.__BoatName = boatName
        self.__StartCordinate = startCordinate
        self.__Lenght = lenght
        self.__Orientation = orientation

        self.__Cordinates = self.__SetCordinates()


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
        for cordinate in self.__Cordinates:
            cordsToDict.append(cordinate.ToJson())
        return { "boatName": self.__BoatName, "lenght": self.Lenght, "orientation": self.Orientation, "startCordinate": self.StartCordinate, "cordinates": cordsToDict}

    def Overlap(self, boat):#i have to do a class from where boat and missiles extends and define this method there
        result = False
        for cordinate in self.Cordinates:
            for boatToPlaceCord in boat.Cordinates:
                if cordinate.__eq__(boatToPlaceCord):
                    result = True
        return result

    @property
    def Lenght(self):
        return self.__Lenght

    @Lenght.setter
    def Lenght(self, newValue):
        self.__Lenght = newValue

    @property
    def Orientation(self):
        return self.__Orientation

    @Orientation.setter
    def Orientation(self, newValue):
        self.__Orientation = newValue

    @property
    def StartCordinate(self):
        return self.__StartCordinate

    @StartCordinate.setter
    def StartCordinate(self, newValue):
        self.__StartCordinate = newValue

    @property
    def Cordinates(self):
        return self.__Cordinates