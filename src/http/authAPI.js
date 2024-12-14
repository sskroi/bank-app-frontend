import { jwtDecode } from "jwt-decode";
import { authHost, host } from ".";

export const signUp = async (input) => {
  const resp = await host.post("auth/sign-up", input);
  if (resp.status === 201) {
    return signIn(input.email, input.password);
  }
  return resp;
};

export const signIn = async (email, password) => {
  const { data } = await host.post("auth/sign-in", { email, password });
  localStorage.setItem("accessToken", data.accessToken);
  return jwtDecode(data.accessToken);
};

export const checkAuth = async () => {
  const resp = await authHost.post("auth/check");
  return resp;
};
