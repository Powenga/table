import { useState, useEffect } from "react";
import { socket } from "../../../shared/api/socket";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return {
    isConnected,
    events,
    socket,
  };
};
