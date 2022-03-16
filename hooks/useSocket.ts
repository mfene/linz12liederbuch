import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io();

export default (eventName?: string, callback?: (...args: any[]) => void) => {
  if (eventName && callback) {
    useEffect(() => {
      socket.on(eventName, callback);

      return () => {
        socket.off(eventName, callback);
      };
    }, [eventName, callback]);
  }

  return socket;
};
