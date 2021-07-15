import React, { useEffect } from "react";
import { API_URL } from "../api/api-settings";
import io from "socket.io-client";
const SocketContext = React.createContext({});

export function SocketContextProvider({ children }) {
  // const connectSocket = new WebSocket(`${API_URL}/connect`);
  const connectSocket = io.connect(`${API_URL}/connect`);

  const values = { connectSocket };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = React.useContext(SocketContext);
  if (!context)
    throw new Error(
      "useSocketContext should be used within a SocketContextProvider"
    );
  return context;
}
