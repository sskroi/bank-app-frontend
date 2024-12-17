import { authHost } from ".";

/**
 * @param {number} offset
 * @param {number} limit
 * @returns {Promise<{ number: string, balance: number, currency: string, isClose: bool }[]>}
 */
export const getAccounts = async (offset = 0, limit = 100) => {
  const resp = await authHost.get("/accounts", { params: { offset, limit } });

  return resp.data;
};

export const createAccount = async (currency = "rub") => {
  const resp = await authHost.post("/account", { currency });

  return resp.data.number;
};

export const closeAccount = async (accountNumber) => {
  const resp = await authHost.delete("/account", {
    params: { number: accountNumber },
  });

  return resp;
};

export const transfer = async (
  senderAccountNumber,
  receiverAccountNumber,
  amount,
) => {
  const resp = await authHost.post("/transaction", {
    senderAccountNumber,
    receiverAccountNumber,
    amount,
  });

  return resp.data;
};
