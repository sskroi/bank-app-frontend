import { authHost } from ".";

export const getAccounts = async (offset = 0, limit = 100) => {
  const resp = await authHost.get("/accounts", { params: { offset, limit } });

  return resp.data;
};

export const createAccount = async (currency = "rub") => {
  const resp = await authHost.post("/account", { currency });

  return resp.data.number;
};
