from Models.Boat import Boat
from Models.Cordinate import Cordinate

VERTICAL = 0
HORIZONTAL = 1
DIFFERENTLENGHTS = [2,3,4]

class Game(object):

    def __init__(self, id, gameName, player1, player2):
        self.__Id = id
        self.__Player1 = player1
        self.__Player2 = player2
        self.__AvailableBoats = [Boat(lenght=3), Boat(lenght=3), Boat(lenght=4), Boat(lenght=5)]
        self.SetAvailableBoatsJson()
        self.__GameBoats = [{"lenght": 3, "quantity": 3}, {"lenght": 4, "quantity": 2}, {"lenght": 5, "quantity": 1}]
        self.__GameName = gameName
        self.__GameState = -1

    def SetAvailableBoatsJson(self):
        self.__AvailableBoatsJson = []
        for boat in self.AvailableBoats:
            self.__AvailableBoatsJson.append(boat.ToJson())

    def ToJson(self):
        return {"id": self.Id, "name": self.GameName, "gameState": self.GameState, "availableBoats": self.__AvailableBoatsJson, "player1": self.__Player1.ToJson(), "player2": self.__Player2.ToJson()}

    def GetPossibleBoatsForCord(self, startCordinate=Cordinate()):
        availableBoats = []
        for len in DIFFERENTLENGHTS:
            boatH = Boat(startCordinate=startCordinate, lenght=len, orientation=VERTICAL)
            boatV = Boat(startCordinate=startCordinate, lenght=len, orientation=HORIZONTAL)
            # boatH = Boat(startCordinate=startCordinate, lenght=5)
            # boatH = Boat(startCordinate=startCordinate, lenght=5)
            print("boatH = {}".format(boatH))
            print("boatV = {}".format(boatV))
            availableBoats.append(boatH)
            availableBoats.append(boatV)

        # for availableBoat in self.AvailableBoats:
        #
        #     availableBoats.append(Boat(boatName="boatV", startCordinate=startCordinate, lenght=availableBoat.Lenght, orientation=VERTICAL))
        #     availableBoats.append(Boat(boatName="boatH", startCordinate=startCordinate, lenght=availableBoat.Lenght, orientation=HORIZONTAL))
        #     availableBoats.append(Boat(boatName="boatV-", startCordinate=Cordinate(startCordinate.X, startCordinate.Y - availableBoat.Lenght), lenght=availableBoat.Lenght, orientation=VERTICAL))
        #     availableBoats.append(Boat(boatName="boatH-", startCordinate=Cordinate(startCordinate.X - availableBoat.Lenght, startCordinate.Y), lenght=availableBoat.Lenght, orientation=HORIZONTAL))
        return availableBoats

    # def getPossibleCordsToPlaceBoat(self, startCordinate=Cordinate()):


    @property
    def Id(self):
        return self.__Id

    @property
    def Player1(self):
        return self.__Player1

    @Player1.setter
    def Player1(self, newValue):
        self.__Player1 = newValue

    @property
    def Player2(self):
        return self.__Player2

    @Player2.setter
    def Player2(self, newValue):
        self.__Player2 = newValue

    @property
    def GameBoats(self):
        return self.__GameBoats

    @GameBoats.setter
    def GameBoats(self, newValue):
        self.__GameBoats = newValue

    @property
    def AvailableBoats(self):
        return self.__AvailableBoats

    @AvailableBoats.setter
    def AvailableBoats(self, newValue):
        self.__AvailableBoats = newValue

    @property
    def GameName(self):
        return self.__GameName

    @GameName.setter
    def GameName(self, newValue):
        self.__GameName = newValue

    @property
    def GameState(self):
        return self.__GameState

    @GameState.setter
    def GameState(self, newValue):
        self.__GameState = newValue