import axios from "axios";

const apiBaseUrl = "https://bankapi.iorkss.ru/api/v1";

type AxiosConfig = Parameters<
  Parameters<typeof axios.interceptors.request.use>[0]
>[0];

export const host = axios.create({
  baseURL: apiBaseUrl,
});

export const authHost = axios.create({
  baseURL: apiBaseUrl,
});

const authInterceptor = (config: AxiosConfig) => {
  if (config.headers) {
    config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  }
  return config;
};

authHost.interceptors.request.use(authInterceptor);
