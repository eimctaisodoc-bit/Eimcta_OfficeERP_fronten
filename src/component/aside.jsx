import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";
import logo from "../assets/eimcta.png";
import { menus } from "../data/data.jsx";
import { useAuth } from "./hooks/useAuth.js";

const Asidebar = ({ loading, isOpen, setIsOpen }) => {

  const { logout } = useAuth();
  // const User=sessionStorage.get('user')
  // console.log()
  const location = useLocation();
  const navigate = useNavigate();
  const updatedMenus = menus[JSON.parse(sessionStorage.getItem('user'))?.role] || [];
  const handleLogOut = async () => {
    try {
      await logout.mutateAsync();
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("Token");
      sessionStorage.setItem("isToken", null);
      sessionStorage.removeItem("user");
      navigate('/', { replace: true })
    } catch (error) {
      alert('error', error.repsonse)
      console.log('error logout', error)

    }

  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 bg-white border-r h-dvh min-h-svh border-orange-100
        transition-all duration-600 ease-in-out font-['Arial_Narrow',sans-serif]
        ${isOpen ? "w-64" : "w-20"}
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between px-4 border-b border-orange-50">
          <div
            className={`flex items-center justify-center overflow-hidden ease-in-out transition-all duration-600
            ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 md:opacity-100 md:w-10"}`}
          >
            {isOpen && (
              loading ? (
                <div className="animate-pulse bg-neutral-quaternary rounded-full w-48 h-12 md:h-16 lg:h-20"></div>
              ) : (
                <img
                  src={logo}
                  alt="Logo"
                  className="lg:h-20 duration-500 transform-3d h-18 mx-5 md:h-20 lg:mx-5 md:mx-5 w-auto object-contain"
                />
              )
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:flex p-1.5 -mx-8 rounded-full bg-amber-50 text-amber-600
              hover:bg-amber-100 border border-amber-200 transition-colors"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} className="hidden lg:flex" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1 px-3 overflow-y-auto h-[calc(100dvh-160px)] min-h-[calc(100svh-160px)] custom-scrollbar">
          {loading ? (
            // Skeleton loading for navigation items
            Array.from({ length: 6 }).map((_, id) => (
              <div
                key={id}
                className={`relative group flex w-full items-center rounded-xl px-3 py-3 animate-pulse
                  ${isOpen ? "ml-0" : "ml-0 md:ml-0"}`}
              >
                <div className="h-6 w-6 rounded-full bg-neutral-quaternary"></div>
                <span
                  className={`ml-3 font-bold tracking-wide whitespace-nowrap 
                   ease-in-out transition-opacity duration-600 bg-neutral-quaternary rounded-full
                  ${!isOpen ? "opacity-0 md:hidden w-0" : "opacity-100 w-48"}`}
                >
                  &nbsp;
                </span>
              </div>
            ))
          ) : (
            updatedMenus.map((item, id) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={id}
                  to={item.path}
                  className={`relative group flex w-full items-center rounded-xl px-3 py-3
                    transition-all duration-200
                    ${isActive
                      ? "bg-[#8b0027] text-white shadow-sm"
                      : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                >
                  <item.icon
                    size={22}
                    className={isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-orange-500"
                    }
                  />

                  {/* Label */}
                  <span
                    className={`ml-3 font-bold tracking-wide whitespace-nowrap 
                     ease-in-out transition-opacity duration-600
                    ${!isOpen ? "opacity-0 md:hidden" : "opacity-100"}`}
                  >
                    {item.name}
                  </span>

                  {/* Tooltip */}
                  {!isOpen && (
                    <span className="absolute left-full ml-4 hidden
                    ease-in-out md:group-hover:flex items-center justify-center
                      rounded-md bg-amber-800 px-3 py-1 text-xs text-white shadow-lg whitespace-nowrap z-50">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })
          )}
        </nav>

        {/* Footer / Profile Section */}
        <div className="absolute bottom-0 left-0 w-full p-3 border-t border-orange-50 bg-orange-50/30">
          {loading ? (
            // Skeleton loading for profile section
            <>
              <div className="flex items-center p-2 mb-2 rounded-lg">
                <div className="h-9 w-9 rounded-full bg-neutral-quaternary flex items-center justify-center text-white shrink-0 shadow-md animate-pulse">
                  <User size={20} className="opacity-0" />
                </div>
                <div className={`ml-3 overflow-hidden transition-all duration-600 ${!isOpen ? "w-0 opacity-0" : "w-full opacity-100"}`}>
                  <div className="animate-pulse bg-neutral-quaternary rounded-full w-48 mb-2 h-4"></div>
                  <div className="animate-pulse bg-neutral-quaternary rounded-full w-32 h-3"></div>
                </div>
              </div>

              <div className="flex w-full items-center rounded-lg px-3 py-2">
                <div className="h-5 w-5 rounded-full bg-neutral-quaternary animate-pulse"></div>
                <span className={`ml-3 font-bold whitespace-nowrap transition-opacity duration-600 bg-neutral-quaternary rounded-full
                  ${!isOpen ? "opacity-0 md:hidden w-0" : "opacity-100 w-20 h-4"}`}>
                </span>
              </div>
            </>
          ) : (
            <>


              <button className="flex w-full items-center rounded-lg px-3 py-2
                text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors group" onClick={handleLogOut}>
                <LogOut size={20} className="text-slate-400 group-hover:text-red-500" />
                <span className={`ml-3 font-bold whitespace-nowrap transition-opacity duration-600
                  ${!isOpen ? "opacity-0 md:hidden" : "opacity-100"}`}>
                  Logout
                </span>
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}

    </div>
  );
};

export { Asidebar };