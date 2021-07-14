from flask import request, jsonify
from flask_cors import cross_origin
from flask_socketio import emit
from flask_socketio import SocketIO, send


from DataProviders import PlayerDataProvider, LobbyDataProvider
from FlaskApp import NavalCrudApp, socketIo
from flask_socketio import join_room

#from Models.Context import Context
from Models.Cordinate import Cordinate

from Models.Game import Game
from Models.Grid import Grid
from Models.Lobby import Lobby
from Models.Player import Player

#__Context = Context

_playerDataProvider = PlayerDataProvider
_lobbyDataProvider = LobbyDataProvider

# @NavalCrudApp.route('/lobby', methods=['POST'])
clients = {}
# @socketIo.on("createLobby")
@socketIo.on("login", namespace="/connect")
def receiveConnection(username):
    # clients.append({username: request.sid})
    sid = request.sid
    print(sid)
    clients[username] = sid
    # clients.append({"username": username, "sessionId": sessionId})
    print(clients)
    for client in clients:
        print(client)
    player = _playerDataProvider.AddPlayer(username, sid)
    player = _playerDataProvider.setLobbyOwner(player.Id)

    lobby = _lobbyDataProvider.newLobby(player)
    recipient_session_id = clients[username]
    print("emitting updateLobby socketEvent on loginEvent")
    result = {"lobby": lobby.ToJson(), "player": player.ToJson()}
    emit("updateLobby", result, room=recipient_session_id)


@socketIo.on("joinLobby", namespace='/connect')
def joinLobbySocket(playerId, lobbyUrl):
    print("player with id {} trying to join lobby: {}".format(playerId, lobbyUrl))
    playerGuest = _playerDataProvider.getPlayerById(playerId)
    playerGuest.LobbyOwner = False
    lobby = _lobbyDataProvider.joinLobby(lobbyUrl, playerGuest)
    if lobby is not None:
        recipient_session_id_Host = clients[lobby.Host.Nickname]
        print(lobby.ToJson())
        print (playerGuest.ToJson())
        recipient_session_id_Guest = clients[lobby.Guest.Nickname]
        print("emitting updateLobby socketEvent on joinLobbyEvent to socket {}".format(recipient_session_id_Host))
        result = {"lobby": lobby.ToJson(), "player": playerGuest.ToJson()}
        emit("updateLobbyJoiner", result, room=recipient_session_id_Host)
        result = {"lobby": lobby.ToJson(), "player": lobby.Host.ToJson()}
        emit("updateLobbyJoin", result, room=recipient_session_id_Guest)
    else:
        print("Lobby not found with url {}".format(lobbyUrl))
    # for client in clients:
    #     if client["sessionId"] == lobby.Host.SessionId:
    #         emit("updateLobby", lobby.ToJson(), room=lobby.Host.SessionId)


            # client.emit('updateLobby', lobby.ToJson())
    # send(lobby.ToJson(), to=lobby)
    # (lobby).emit(lobby.ToJson())
    # return lobby.ToJson(), 200


@NavalCrudApp.route('/lobby', methods=['POST'])
@cross_origin()
def createLobby():
    sid = request.sid
    sessionId = request.json["sessionId"]
    # clients.append(namespace)
    print(sessionId)
    # namespace = ""
    playerNickname = request.json["nickname"]
    player = _playerDataProvider.AddPlayer(playerNickname, sessionId)
    player = _playerDataProvider.setLobbyOwner(player.Id)

    lobby = _lobbyDataProvider.newLobby(player)
    return lobby.ToJson(), 200

@NavalCrudApp.route('/lobby/<int:lobbyUrl>', methods=['GET'])
@cross_origin()
def getLobby(lobbyUrl):
    lobby = _lobbyDataProvider.getLobbyByUrl(lobbyUrl)
    return lobby.ToJson(), 200


@NavalCrudApp.route('/lobby/join/<int:playerId>/<int:lobbyUrl>', methods=['GET'])
@cross_origin()
def joinLobby(playerId, lobbyUrl):
    playerGuest = _playerDataProvider.getPlayerById(playerId)
    lobby = _lobbyDataProvider.joinLobby(lobbyUrl, playerGuest)
    for client in clients:
        if client == lobby.Host.SessionId:
            client.emit('updateLobby', lobby.ToJson())
    # send(lobby.ToJson(), to=lobby)
    # (lobby).emit(lobby.ToJson())
    return lobby.ToJson(), 200

