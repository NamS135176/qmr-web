import { create } from "apisauce";
import i18n from "utils/i18n";

export const apiQMRWeb = create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": i18n.language ?? "jp",
  },
  timeout: 10000,
});

export const setAuthorize = (value) => {
  apiQMRWeb.setHeader("Authorization", value);
};

export function getResponseData(res: any) {
  if (res.ok) {
    return res.data;
  } else {
    if (res.data && res.data.message) {
      return Promise.reject({
        ...res.data,
        message: res.data.message,
        status: res.status,
      });
    } else {
      return Promise.reject({
        ...res.data,
        message: res.originalError.message,
        status: res.status,
      });
    }
  }
}
