import { ITransaction } from "types/types";
import { authHost } from "./index";

export const transfer = async (
  senderAccountNumber: string,
  receiverAccountNumber: string,
  amount: string,
) => {
  const resp = await authHost.post<ITransaction>("/transaction", {
    senderAccountNumber,
    receiverAccountNumber,
    amount,
  });

  return resp.data;
};

export interface GetTransfersInput {
  accountNumber?: string;
  offset?: number;
  limit?: number;
}

export const getTransfers = async (
  params: GetTransfersInput = { offset: 0, limit: 100 },
) => {
  const resp = await authHost.get("/transactions", { params: params });

  return resp.data;
};
