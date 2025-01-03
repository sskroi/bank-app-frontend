import axios, { InternalAxiosRequestConfig } from "axios";

const apiBaseUrl = "https://bankapi.iorkss.ru/api/v1";

export const host = axios.create({
  baseURL: apiBaseUrl,
});

export const authHost = axios.create({
  baseURL: apiBaseUrl,
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  }
  return config;
};

authHost.interceptors.request.use(authInterceptor);
