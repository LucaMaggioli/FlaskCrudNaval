from Models.Player import Player


class IAPlayer(Player):
    def __init__(self, id=-1, nickname="", sessionId=""):
        Player.__init__(self, id=id, nickname=nickname, sessionId=sessionId)
