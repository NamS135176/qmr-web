import { apiQMRWeb, getResponseData } from "./index";

export const getGraph = async (timeFrom, timeTo) => {
  const language = localStorage.getItem("i18nextLng") === "en" ? "en" : "jp";
  apiQMRWeb.setHeader("Accept-Language", language);
  const res = await apiQMRWeb.get(
    `/graph?time_from=${timeFrom}&time_to=${timeTo}`
  );
  return getResponseData(res);
};
