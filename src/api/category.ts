import { apiQMRWeb, getResponseData } from "./index";

export const getCategory = async () => {
  const res = await apiQMRWeb.get(`/category`);
  return getResponseData(res);
};
