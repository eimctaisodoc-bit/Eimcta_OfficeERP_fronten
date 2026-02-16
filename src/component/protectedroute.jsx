import React, { useEffect } from "react";
import { Navigate, Outlet, replace, useNavigate } from "react-router-dom";


const ProtectedRoute = ({ roles = [] }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("isToken"); // real token
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  // console.log('running protected router', user?.role,roles)
  
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "token" && !e.newValue) {
        navigate('/', { replace: true }) // redirect to login
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // No token or user → redirect to login
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }


  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
