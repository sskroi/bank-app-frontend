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
