import { apiQMRWeb, getResponseData } from "api";

export const getListTransactions = async (timeFrom, timeTo, count, offset) => {
  const res = await apiQMRWeb.get(
    `/expense?time_from=${timeFrom}&time_to=${timeTo}&count=${count}&offset=${offset}`
  );
  return getResponseData(res);
};
