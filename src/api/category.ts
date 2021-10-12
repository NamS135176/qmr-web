import { apiQMRWeb, getResponseData } from "api";

export const getCategories = async () => {
  const res = await apiQMRWeb.get("/category");
  return getResponseData(res);
};
