import { IAccount } from "../types/types";
import { authHost } from ".";

export const getAccounts = async (offset = 0, limit = 100) => {
  const resp = await authHost.get<IAccount[]>("/accounts", {
    params: { offset, limit },
  });

  return resp.data;
};

export const createAccount = async (currency = "rub") => {
  const resp = await authHost.post<IAccount>("/account", { currency });

  return resp.data.number;
};

export const closeAccount = async (accountNumber: string) => {
  const resp = await authHost.delete("/account", {
    params: { number: accountNumber },
  });

  return resp;
};
