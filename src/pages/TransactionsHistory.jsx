import React from "react";
import { Container } from "react-bootstrap";
import TransferList from "../components/TransferList";

const TransactionsHistory = () => {
  return (
    <Container
      style={{ marginTop: "60px" }}
      className="d-flex justify-content-center align-items-center flex-column gap-3"
    >
      <h2 style={{ color: "var(--primary-text-color)" }}>История транзакций</h2>
      <TransferList style={{ width: "100%", maxWidth: "600px" }} allTransfers />
    </Container>
  );
};

export default TransactionsHistory;
