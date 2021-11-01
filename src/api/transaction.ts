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
  console.log("🚀 ~ file: transaction.ts ~ line 14 ~ res", res);
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
  device_id,
  remove_photo,
  shop_name_id = "189763"
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
    remove_photo,
    shop_name_id,
  });
  return getResponseData(res);
};

export const deleteTransaction = async (id) => {
  const res = await apiQMRWeb.delete(`transactions/${id}`);
  return getResponseData(res);
};

export const createTransaction = async (
  category_id,
  time,
  price,
  memo,
  device_id,
  photo = "",
  count = 1,
  client_id = "0",
  payment_method_id = "106806",
  shop_name_id = "189763"
) => {
  const res = await apiQMRWeb.post(`transactions`, {
    category_id,
    payment_method_id,
    time,
    price,
    memo,
    photo,
    count,
    client_id,
    device_id,
    shop_name_id,
  });
  return getResponseData(res);
};

export const uploadImage = async (file: any) => {
  apiQMRWeb.setHeader("Content-Type", "multipart/form-data");
  let formData = new FormData();
  formData.append("image", file);
  const res = await apiQMRWeb.post("upload-photo", formData);
  apiQMRWeb.setHeader("Content-Type", "application/json");
  return getResponseData(res);
};
