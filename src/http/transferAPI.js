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

export const getAccountTransfers = async (accountNumber) => {
  //const resp = await authHost.get("/")

  return [
    {
      publicId: "c7b5f3d2-91f8-4eb2-8c6a-2a57129bc4d1",
      senderAccountNumber: "be9d4321-56a7-4d58-b6d9-8b7e122af340",
      receiverAccountNumber: "e4a7fc3d-67a8-4925-bf7c-21b4a5d5f768",
      sent: "1000.00",
      received: "1200.00",
      sentCurrency: "USD",
      receivedCurrency: "EUR",
      isConversion: true,
      isIncoming: false,
      conversionRate: "1.2",
      timestamp: "2024-12-19T14:23:00Z",
    },
    {
      publicId: "a9c23b16-41fa-4b89-b4b5-d7df613b8b8a",
      senderAccountNumber: "f3b2e7d9-47f2-4e54-86a6-2c54db719807",
      receiverAccountNumber: "b5e4a6d7-83a7-4d21-9e7c-8f2a1e92f712",
      sent: "500.50",
      received: "500.50",
      sentCurrency: "EUR",
      receivedCurrency: "EUR",
      isConversion: false,
      isIncoming: true,
      conversionRate: "1.0",
      timestamp: "2024-12-19T14:25:30Z",
    },
    {
      publicId: "d4a9f2b1-8e62-4927-b5d6-a3f84b2f9c70",
      senderAccountNumber: "b1a8d3e5-42f7-4d86-85a6-7e5c4b1f9c87",
      receiverAccountNumber: "e2f4b9a1-76d3-4f82-9c5b-8d7a1f5e4210",
      sent: "750.25",
      received: "900.30",
      sentCurrency: "GBP",
      receivedCurrency: "USD",
      isConversion: true,
      isIncoming: false,
      conversionRate: "1.2",
      timestamp: "2024-12-19T14:28:00Z",
    },
    {
      publicId: "b7d2e5c9-4a3f-481f-a6e5-8d7b4c5f9a21",
      senderAccountNumber: "c4b7a9d2-85f3-4d62-8f9c-7e5a2d4f9b87",
      receiverAccountNumber: "f5a9e4d3-72d6-4b82-9a1f-8c7d2b5f4a10",
      sent: "300.00",
      received: "300.00",
      sentCurrency: "USD",
      receivedCurrency: "USD",
      isConversion: false,
      isIncoming: true,
      conversionRate: "1.0",
      timestamp: "2024-12-19T14:30:15Z",
    },
  ];
};
