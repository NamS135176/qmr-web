import { apiQMRWeb, getResponseData } from "./index";

export const getShopName = async () => {
  const res = await apiQMRWeb.get("/shop-name");
  return getResponseData(res);
};
