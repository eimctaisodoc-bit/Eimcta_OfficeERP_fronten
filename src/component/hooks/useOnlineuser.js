import { useQuery } from "@tanstack/react-query";

export const useOnlineUsers = () => {
  return useQuery({
    queryKey: ["onlineUsers"],
    queryFn: () => [],
    staleTime: Infinity
  });
};