import { useState, useEffect } from "react";
import { socket } from "../../../shared/api/socket";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onEvent(value: string) {
      setEvents((previous) => [...previous, value]);
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
