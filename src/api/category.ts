import { apiQMRWeb, getResponseData } from "./index";

export const getCategory = async () => {
  const res = await apiQMRWeb.get(`/categories`);
  return getResponseData(res);
};
