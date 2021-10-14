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
    `/transactions?time_from=${timeFrom}&time_to=${timeTo}&count=${count}&offset=${offset}&order_by=${order}&sort_by=${sort}`
  );
  return getResponseData(res);
};

export const updateTransaction = async (
  id,
  category_id,
  payment_method_id,
  time,
  price,
  memo,
  photo,
  count,
  client_id,
  device_id
) => {
  const res = await apiQMRWeb.put(`transactions/${id}`, {
    category_id,
    payment_method_id,
    time,
    price,
    memo,
    photo,
    count,
    client_id,
    device_id,
  });
  return 0;
};
