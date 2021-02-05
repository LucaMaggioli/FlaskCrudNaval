#from Models.Cordinate import Cordinate

class Grid(object):


    def __init__(self):
        self.__CordinateMax = 10
        #self.__CordinateMax = Cordinate(10, 10)
        #self.__AllCordinates = self.__getAllCoordinates()

        @property
        def CordinateMax(self):
            print("coridnate max is : {}".format(self.__CordinateMax))
            return self.__CordinateMax

