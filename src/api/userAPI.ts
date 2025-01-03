import { IUser } from "../types/types";
import { authHost } from "./index";

export const getUserInfo = async () => {
  const resp = await authHost.get<IUser>("/user");

  return resp.data;
};
