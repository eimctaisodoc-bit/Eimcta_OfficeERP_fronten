import { useQuery } from "@tanstack/react-query";
import React from "react";
export const useOnlineUsers = () => {
  return useQuery({
    queryKey: ["online-users"],  // ✅ array
    queryFn: () => ({}),         // ✅ object syntax
    staleTime: Infinity,
  });
};