import api from "./axios";

export const loginUser = async (data) => {
  const res = await api.post("/api/auth/login", data,{ withCredentials: true });
  return res.data;
};


export const getMe = async () => {
  const res = await api.get("/api/auth/me",{ withCredentials: true });
  return res.data; 
};

export const logoutUser = async () => {
  const { data } = await api.post("/api/auth/logout");
  return data;
};