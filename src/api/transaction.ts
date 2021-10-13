import { apiQMRWeb, getResponseData } from "api";

export const getListTransactions = async (
  timeFrom,
  timeTo,
  count,
  offset,
  order,
  sort
) => {
  const res = await apiQMRWeb.get(
    `/expense?time_from=${timeFrom}&time_to=${timeTo}&count=${count}&offset=${offset}&order_by=${order}&sort_by=${sort}`
  );
  return getResponseData(res);
};
