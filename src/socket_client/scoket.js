import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  autoConnect: false,        // ⛔ don't connect until login
  withCredentials: true      // allows cookies if needed
});
