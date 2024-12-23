import { jwtDecode } from "jwt-decode";
import { authHost, host } from "./index";

interface SignUpInput {
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  passport: string;
  password: string;
}

export const signUp = async (input: SignUpInput) => {
  const resp = await host.post("auth/sign-up", input);
  if (resp.status === 201) {
    return signIn(input.email, input.password);
  }
  return resp;
};

export const signIn = async (email: string, password: string) => {
  const { data } = await host.post<{ accessToken: string }>("auth/sign-in", {
    email,
    password,
  });
  localStorage.setItem("accessToken", data.accessToken);
  return jwtDecode(data.accessToken);
};

export const checkAuth = async () => {
  const resp = await authHost.post("auth/check");
  return resp;
};
