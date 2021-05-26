from Models.CordinateStatus import CordinateStatus


class Cordinate(object):
    def __init__(self, x=0, y=0, status=CordinateStatus.WATER):
        self.__Id = "x{}y{}".format(x, y)
        self.__X = x
        self.__Y = y
        self.__Status = status

    # def __str__(self):
    def ToJson(self):
        return {"id": self.Id, "x": self.X, "y": self.Y, "status": self.Status.value}

    def __eq__(self, cordinate):
        return cordinate.X == self.X and cordinate.Y == self.Y

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
    @Y.setter
    def Y(self, newValue):
        self.__Y = newValue
    @property
    def Status(self):
        return self.__Status
    @Status.setter
    def Status(self, newValue):
        self.__Status = newValue
