import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../../socket_client/scoket";

export const useOnlineUsersSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = sessionStorage.getItem("Token");

    if (!token) return;

    socket.auth = { token };

    if (!socket.connected) {
      socket.connect();
    }

    const handleUserStatus = (data) => {
      // console.log("📡 Users received:", data);

      const formattedUsers = data.map(([id, user]) => ({
        id,
        ...user
      }));

      queryClient.setQueryData(["onlineUsers"], formattedUsers);
    };

    const handleDisconnect = () => {
      console.log(" Socket disconnected");

      queryClient.setQueryData(["onlineUsers"], []);
    };

    socket.on("user:status", handleUserStatus);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("user:status", handleUserStatus);
      socket.off("disconnect", handleDisconnect);
    };
  }, [queryClient]);
};