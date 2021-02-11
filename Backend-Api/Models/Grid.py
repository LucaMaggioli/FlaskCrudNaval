#from Models.Cordinate import Cordinate

class Grid(object):


    def __init__(self, cordMax):
        self.__CordinateMax = cordMax
        #self.__CordinateMax = Cordinate(10, 10)
        #self.__AllCordinates = self.__getAllCoordinates()

    def __dict__(self):
        return {"Id": self.__CordinateMax}

    @property
    def CordinateMax(self):
        print("coridnate max is : {}".format(self.__CordinateMax))
        return self.__CordinateMax

