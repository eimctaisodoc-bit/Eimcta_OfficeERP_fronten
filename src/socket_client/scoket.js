// socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const allowedPaths = ["/admin/report", "/staff/report", "/client/report"];

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false, // important
});

// optional: attach listeners once
socket.on("connect", () => {
  console.log("✅ Connected! ID:", socket);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket Error:", err.message);
});

export default socket;