import { apiQMRWeb, getResponseData } from "./index";

export const login = async (email: string, password: string) => {
  const res = await apiQMRWeb.post("/login", {
    email,
    password,
  });
  return getResponseData(res);
};

export const forgotPassword = async (email: string) => {
  const res = await apiQMRWeb.post("/forgot-password", {
    email,
  });
  return getResponseData(res);
};
