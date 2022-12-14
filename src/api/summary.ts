import { apiQMRWeb, getResponseData } from "./index";

export const getSummary = async (timeFrom, timeTo) => {
  const res = await apiQMRWeb.get(
    `/summary?time_from=${timeFrom}&time_to=${timeTo}`
  );
  return getResponseData(res);
};
