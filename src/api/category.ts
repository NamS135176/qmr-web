import { apiQMRWeb, getResponseData } from "./index";

export const getCategory = async () => {
  const language = localStorage.getItem("i18nextLng") === "en" ? "en" : "jp";
  apiQMRWeb.setHeader("Accept-Language", language);
  const res = await apiQMRWeb.get(`/categories`);
  return getResponseData(res);
};
