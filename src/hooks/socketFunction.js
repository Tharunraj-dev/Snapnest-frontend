import { useCallback, useEffect } from "react";
import socket from "../services/socket";

export const useSocketOn = (event, callbank) => {
  if (!socket) return;
  useEffect(() => {
    socket.on(event, callbank);
    return () => socket.off(event, callbank);
  }, [socket]);
};

export const useSocketEmit = () => {
  if (!socket) return null;
  return useCallback((event, data) => {
    if (!socket) return;
    console.log(event, data);
    
    socket.emit(event, data);
  }, [socket]);
};