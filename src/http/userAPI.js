import { authHost } from "./index.js";

export const getUserInfo = async () => {
  const resp = await authHost.get("/user");

  return resp.data;
};
