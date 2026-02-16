import api from "./axios";

export const getUserAccounts = async () => {
  const { data } = await api.get("/api/accounts");
  return data;
};

export const createUserAccount = async (payload) => {
  const { data } = await api.post("/api/accounts", payload);
  return data;
};
