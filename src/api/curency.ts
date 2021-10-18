import { apiQMRWeb, getResponseData } from "./index";

export const getCurrencies = async () => {
  const res = await apiQMRWeb.get(`currencies`);
  return getResponseData(res);
};
