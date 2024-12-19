import { authHost } from "./index.js";

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

export const getTransfers = async (accountNumber, offset = 0, limit = 100) => {
  const params = { offset: offset, limit: limit };
  if (accountNumber) {
    params.accountNumber = accountNumber;
  }

  const resp = await authHost.get("/transactions", { params: params });

  return resp.data;
};
