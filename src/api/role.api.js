import api from "./axios";

export const getAdminDashboard = async () => {
  const res = await api.get("/admin");
  return res.data;
};

export const getSuperAdminDashboard = async () => {
  const res = await api.get("/super_admin");
  return res.data;
};

export const getClientDashboard = async () => {
  const res = await api.get("/client");
  return res.data;
};
export const getStaffDashboard = async () => {
  const res = await api.get("/staff");
  return res.data;
};
