import React from "react";
import HeroOverlay from "../../overlay";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, loginUser } from "../../../api/auth.api";
// import { useSocketListeners } from "../../hooks/usesocketListenerhook";

const Admin_Report = () => {
//   const onlineUsers = useQuery({ queryKey: ["onlineUsers"], initialData: [] });
// const onlineCount = useQuery({ queryKey: ["onlineUsersCount"], initialData: 0 });

// console.log(onlineCount.data, onlineUsers.data);
// useSocketListeners()
    return (

        <div className="w-full ">
            <HeroOverlay />
        </div>
    );
}
export default Admin_Report;