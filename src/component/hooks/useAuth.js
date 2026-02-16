// src/hooks/useAuth.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe, loginUser, logoutUser } from "../../api/auth.api";
import { socket } from "../../socket_client/scoket";

export const useAuth = () => {

  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });


  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth-user"], data.user);
    },
  });

  // 🚪 Logout
  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.clear(); // clear all cached data
      // socket.disconnect()
    },
  });

  
  return {
    userQuery,
    isAuthLoading: userQuery.isLoading,
    login,
    logout,
  };
};
