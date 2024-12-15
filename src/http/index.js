import axios from "axios";

const apiBaseUrl = "http://bankapi.iorkss.ru/api/v1";

const host = axios.create({
  baseURL: apiBaseUrl,
});

const authHost = axios.create({
  baseURL: apiBaseUrl,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);

export { host, authHost };
