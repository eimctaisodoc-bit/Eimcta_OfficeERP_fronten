// useOnlineUsers.js
import { useEffect, useState } from "react";
import socket from "../../socket_client/scoket";

export const useOnlineUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    if (!token) {
      setLoading(false);
      return;
    }

    // Attach token
    socket.auth = { token };

    // Connect if not connected
    if (!socket.connected) {
      socket.connect();
    }

    // ----- EVENT HANDLERS -----

    const handleUserStatus = (data) => {
      console.log("📡 Users received:", data);

      // Convert Map entries to clean array
      // Backend sends: [ [id, {name, ...}], ... ]
      const formattedUsers = data.map(([id, user]) => ({
        id,
        ...user,
      }));

      setUsers(formattedUsers);
      setLoading(false);
    };

    const handleDisconnect = () => {
      console.log("🔌 Socket disconnected");
      setUsers([]);
    };

    // Remove old listeners (important)
    socket.off("user:status", handleUserStatus);
    socket.off("disconnect", handleDisconnect);

    // Attach listeners
    socket.on("user:status", handleUserStatus);
    socket.on("disconnect", handleDisconnect);

    // Cleanup
    return () => {
      socket.off("user:status", handleUserStatus);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return { users, loading };
};