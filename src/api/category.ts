import { apiQMRWeb, getResponseData } from "./index";

export const getCategory = async () => {
  const language = localStorage.getItem("i18nextLng") === "en" ? "en" : "jp";
  apiQMRWeb.setHeader("Accept-Language", language);
  const res = await apiQMRWeb.get(`/categories`);
  return getResponseData(res);
};

export const addExpense = async (
  name,
  count,
  nameJP = "?",
  nameCHT = "?",
  nameCHS = "?",
  nameFR = "?",
  nameES = "?",
  income_flag = false
) => {
  const res = await apiQMRWeb.post("/categories", {
    name,
    count,
    nameJP,
    nameCHT,
    nameCHS,
    nameFR,
    nameES,
    income_flag,
  });

  return getResponseData(res);
};

export const editExpense = async (
  id,
  name,
  count,
  nameJP,
  nameCHT,
  nameCHS,
  nameFR,
  nameES,
  colorindex = 0,
  income_flag = false
) => {
  const res = await apiQMRWeb.put(`/categories/${id}`, {
    name,
    count,
    nameJP,
    nameCHT,
    nameCHS,
    nameFR,
    nameES,
    colorindex,
    income_flag,
  });

  return getResponseData(res);
};

export const deleteExpense = async (id) => {
  const res = await apiQMRWeb.delete(`/categories/${id}`);
  getResponseData(res);
};
