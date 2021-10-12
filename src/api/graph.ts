import { apiQMRWeb, getResponseData } from "./index";

export const getGraph = async (timeFrom, timeTo) => {
  const res = await apiQMRWeb.get(
    `/expense/graph?time_from=${timeFrom}&time_to=${timeTo}`
  );
  return getResponseData(res);
};
