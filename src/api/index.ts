import { create } from "apisauce";

export const apiQMRWeb = create({
  baseURL: "http://api-web-dev.quick-money-recorder.com/",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export const setAuthorize = (value) => {
  apiQMRWeb.setHeader("Authorization", value);
  apiQMRWeb.setHeader("Accept-Language", "jp, en, cht, chs");
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
