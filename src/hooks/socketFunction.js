import { useCallback, useEffect } from "react";
import socket from "../services/socket";

export const useSocketOn = (event, callbank) => {
  if (!socket) return;
  useEffect(() => {
    socket.on(event, callbank);
    return () => socket.off(event, callbank);
  }, [socket]);
};

export const useSocketEmit = (event, data) => {
  if (!socket) return null;
  return useCallback(() => {
    if (!socket) return;
    socket.emit(event);
  }, [socket]);
};
