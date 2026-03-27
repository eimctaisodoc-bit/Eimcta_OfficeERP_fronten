import React, { useMemo, useState } from "react";
import { User } from "lucide-react";
import HeroOverlay from "../../overlay";
import { useOnlineUsersSocket } from "../../hooks/usesocketListenerhook";
import { useOnlineUsers } from "../../hooks/useOnlineuser";

/* =========================================================
   STATUS INDICATOR (Perfectly Symmetrical)
========================================================= */
const StatusIndicator = ({ status }) => {
    const base =
        "absolute bottom-0.5 right-0.5  h-3.5 w-3.5 rounded-full ring-2 ring-white  shadow-sm z-20";

    switch (status) {
        case "online":
            return (
                <span className={`${base} bg-green-500`} title="Online">
                    <span className="absolute inset-0 rounded-full bg-green-400 opacity-70 animate-ping" />
                </span>
            );

        case "away":
            return <span className={`${base} bg-amber-400`} title="Away" />;

        case "busy":
            return (
                <span
                    className={`${base} bg-red-500 flex items-center justify-center`}
                    title="Busy"
                >
                    <span className="h-[2px] w-2.5 bg-white rounded-full" />
                </span>
            );

        default:
            return <span className={`${base} bg-slate-400`} title="Offline" />;
    }
};

/* =========================================================
   AVATAR WITH PERFECT CIRCLE + CENTER ALIGNMENT
========================================================= */
const UserAvatarStatus = ({ user }) => {
    const [imgError, setImgError] = useState(false);

    const renderContent = () => {
        if (user.avatarUrl && !imgError) {
            return (
                <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={() => setImgError(true)}
                />
            );
        }

        if (user.name) {
            const initial = String(user.name).charAt(0).toUpperCase();
            return (
                <span className="text-white font-bold text-base select-none">
                    {initial}
                </span>
            );
        }

        return <User className="text-white/80 w-5 h-5" />;
    };

    return (
        <div className="relative flex flex-col items-center group">
            {/* Avatar Circle */}
            <div
                className={`relative w-12 h-12 rounded-full overflow-hidden 
            flex items-center justify-center transition-transform duration-200 
            group-hover:scale-105 ring-2 ring-white shadow-md ${user.color || "bg-slate-600"
                    }`}
            >
                {renderContent()}

                {/* Subtle gloss */}
                <div className="absolute inset-0 rounded-full
                 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none" />
            </div>

            {/* Status */}
            <StatusIndicator status={user.status} />

            {/* Tooltip */}
            <div className="relative group inline-block ">
                {/* Tooltip */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 
                  rounded-md bg-slate-800 text-white text-xs font-medium 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200 
                  pointer-events-none whitespace-nowrap z-50">

                    {user.name} ({user.status})

                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 
                    w-0 h-0 
                    border-l-4 border-l-transparent 
                    border-r-4 border-r-transparent 
                    border-t-4 border-t-slate-800">
                    </div>

                </div>

            </div>
        </div>
    );
};


const normalizeOnlineUsers = (rawUsers) => {
    if (!Array.isArray(rawUsers)) return [];

    return rawUsers
        .map((item) => {
            if (Array.isArray(item) && item.length === 2) {
                const [keyUsername, userObj] = item;
                if (userObj && typeof userObj === "object") {
                    return { username: userObj.username || keyUsername, ...userObj };
                }
                return { username: String(keyUsername || ""), status: "online" };
            }

            if (item && typeof item === "object") {
                return { username: item.username || item.name || "", ...item };
            }

            if (typeof item === "string") return { username: item };

            return null;
        })
        .filter(Boolean);
};

const getCurrentSessionUser = () => {
    try {
        const raw = sessionStorage.getItem("user");
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
        return null;
    }
};

const pickColorByRole = (role) => {
    switch (role) {
        case "admin":
            return "bg-indigo-400";
        case "staff":
            return "bg-pink-400";
        case "client":
            return "bg-amber-400";
        default:
            return "bg-slate-600";
    }
};

const Admin_Report = () => {
    useOnlineUsersSocket()
    const { data: users = [], isLoading } = useOnlineUsers();
    console.log('new users ',users,isLoading)
    const me = useMemo(() => getCurrentSessionUser(), []);

    const visibleUsers = useMemo(() => {
        const normalized = normalizeOnlineUsers(users);
        if (!me) return normalized;

        const myUsername = me.username || me.user?.username || "";
        const myId = me.id || me.user?.id || "";

        return normalized.filter((u) => {
            const uUsername = u.username || "";
            const uId = u.socketId || "";
            if (myUsername && uUsername && myUsername === uUsername) return false;
            if (myId && uId && myId === uId) return false;
            return true;
        });
    }, [users, me]);

    return (
        <div className="w-full font-['Roboto',sans-serif]">
            <HeroOverlay />

            <div className="px-6 py-8">
                {visibleUsers.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 border
                    
                    border-slate-100 dark:border-slate-800 rounded-2xl p-6 text-center">
                        <p className="text-slate-600 dark:text-slate-300">
                            No other users online.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-row  gap-3 justify-items-start">
                        {visibleUsers.map((u) => {
                            const displayName = u.username || "Unknown";
                            const role = u.role || "user";

                            return (
                                <div
                                    key={u.socketId || u.id || displayName}
                                    className="flex flex-col items-center text-center"
                                >
                                    <UserAvatarStatus
                                        user={{
                                            name: displayName,
                                            status: u.status || "online",
                                            avatarUrl: u.avatarUrl || "",
                                            color: pickColorByRole(role),
                                        }}
                                    />


                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin_Report;