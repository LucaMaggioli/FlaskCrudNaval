from Models.CordinateStatus import CordinateStatus


class Cordinate (object):
    def __init__(self, x, y):
        self.__Id = "x{}y{}".format(x, y)
        self.__X = x
        self.__Y = y
        self.__Status = CordinateStatus.WATER

    # def __str__(self):
    def ToJson(self):
        return {"id": self.Id, "x": self.X, "y": self.Y, "status": self.Status.value}

    @property
    def Id(self):
        return self.__Id

    @property
    def X(self):
        return self.__X
    @X.setter
    def X(self, newValue):
        self.__X = newValue
    @property
    def Y(self):
        return self.__Y
    @X.setter
    def Y(self, newValue):
        self.__Y = newValue
    @property
    def Status(self):
        return self.__Status
    @Status.setter
    def Status(self, newValue):
        self.__Status = newValue
