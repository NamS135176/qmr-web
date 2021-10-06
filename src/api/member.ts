import { apiQMRWeb, getResponseData } from './index';

export const login = async (email: string, password: string) => {
  const res = await apiQMRWeb.post('/login', {
    email,
    password,
  });
  return getResponseData(res);
};
