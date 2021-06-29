from Models.Cordinate import Cordinate
from Models.Constants import HORIZONTAL, VERTICAL


class Shape(object):
    def __init__(self, startCordinate=Cordinate(-1, -1), lenght=0, orientation=VERTICAL):
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


    def Overlap(self, other):
        print("Shape Overlap Method")
        overlap = False
        for selfCord in self.Cordinates:
            for otherCord in other.Cordinates:
                if selfCord.__eq__(otherCord):
                    print("Element: {}, overlap the Other: {}".format(self, other))
                    overlap = True
        return overlap

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