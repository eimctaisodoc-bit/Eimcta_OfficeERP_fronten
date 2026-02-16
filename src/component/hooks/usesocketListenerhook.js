import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../../socket_client/scoket";

export const useSocketListeners = () => {
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   // 1. Get the actual user object and the STRING token
  //   const userStr = sessionStorage.getItem("user");
  //   // CHANGE THIS: 'isToken' is a boolean flag. Get the actual JWT string key!
  //   const token = sessionStorage.getItem("isToken"); 

  //   if (!socket || !userStr || !token) {
  //     console.warn("🔌 Socket: Missing user or token. Connection skipped.");
  //     return;
  //   }

  //   const currentUser = JSON.parse(userStr);

  //   // 2. Prevent double connection if already active
  //   if (socket.connected) return;

  //   // 3. Set the REAL token in auth
  //   socket.auth = { token };

  //   const onConnect = () => {
  //     console.log("✅ Socket Connected:", socket.id);
  //     queryClient.setQueryData(["socketStatus"], "connected");
  //   };

  //   const onConnectError = (err) => {
  //     console.error("❌ Socket Auth Error:", err.message);
  //     // If it says 'Unauthorized', it means the token string is invalid/expired
  //   };

  //   const onDisconnect = (reason) => {
  //     console.log("🔌 Disconnected:", reason);
  //     queryClient.setQueryData(["socketStatus"], "disconnected");
  //   };

  //   socket.on("connect", onConnect);
  //   socket.on("connect_error", onConnectError);
  //   socket.on("disconnect", onDisconnect);

  //   socket.connect();

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("connect_error", onConnectError);
  //     socket.off("disconnect", onDisconnect);
  //   };
  // }, []); 
};