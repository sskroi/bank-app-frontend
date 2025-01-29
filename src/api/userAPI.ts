import { IUser } from "../types/types";
import { authHost } from "./index";

export const getUserInfo = async () => {
  const resp = await authHost.get<IUser>("/user");

  return resp.data;
};

interface updateUserProfileInput {
  currentPassword: string;
  email?: string;
  name?: string;
  passport?: string;
  password?: string;
  patronymic?: string;
  surname?: string;
}

export const updateUserProfile = async (input: updateUserProfileInput) => {
  const resp = await authHost.patch("/user", input);
  return resp;
};
