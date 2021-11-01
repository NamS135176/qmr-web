import { apiQMRWeb, getResponseData } from "./index";

export const getPaymentMethod = async () => {
  const res = await apiQMRWeb.get("/payment-method");
  return getResponseData(res);
};
