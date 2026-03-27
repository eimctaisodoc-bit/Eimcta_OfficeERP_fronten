import { Outlet } from "react-router-dom";
import { Asidebar } from "../component/aside.jsx";
import { useAuth } from "../component/hooks/useAuth.js";
// import { Loader } from "../component/loader.jsx";
import Navbar from "../component/navbar";
import React, { useState, useEffect, useRef } from "react";
import { CornerDownLeft } from "lucide-react";
import { MainLoader } from "../component/loader.jsx";

const Dashboard = () => {

  const { isAuthLoading } = useAuth();



  const [isOpen, setIsOpen] = useState(true);
  const asideRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        window.innerWidth < 768 &&
        asideRef.current &&
        !asideRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>

      <div>
        <div ref={asideRef}>
          <Asidebar
            isOpen={isOpen} setIsOpen={setIsOpen}
          />
          {/* <LoginStatus/> */}
        </div>
        <Navbar
          isOpen={isOpen}
          toggleSidebar={() => setIsOpen(!isOpen)}
        />
      </div>
      <main className={`flex-1 ${isOpen ? "ml-67" : "ml-0 md:ml-20"} p-2   ${isAuthLoading ? 'mt-48' : 'mt-16'} bg-white `}>
        {
          isAuthLoading ? <MainLoader /> : <Outlet />
        }

      </main>
    </>
  );
};

export default Dashboard;
