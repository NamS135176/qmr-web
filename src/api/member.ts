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

export const changePassword = async (
  email: string,
  password: string,
  old_password: string
) => {
  const res = await apiQMRWeb.post("/change-password", {
    email: email,
    password: password,
    old_password: old_password,
  });
  return getResponseData(res);
};

export const getCurrentMember = async () => {
  const res = await apiQMRWeb.get("/member");
  return getResponseData(res);
};

export const updateCurrentMember = async (language, currency_id) => {
  const res = await apiQMRWeb.put("/member", {
    language,
    currency_id,
  });
  return getResponseData(res);
};
