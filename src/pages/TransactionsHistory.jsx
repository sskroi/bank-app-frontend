import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import TransferList from "../components/TransferList";
import { getTransfers } from "../http/transferAPI";

const TransactionsHistory = () => {
  const [transfs, setTransfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransfers = () => {
    getTransfers()
      .then((data) => {
        setTransfs(data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  useEffect(fetchTransfers, []);

  return (
    <Container
      style={{ marginTop: "60px" }}
      className="d-flex justify-content-center align-items-center flex-column gap-3"
    >
      <h2 style={{ color: "var(--primary-text-color)" }}>История транзакций</h2>
      {loading ? (
        <Spinner />
      ) : transfs.length === 0 ? (
        <h3 style={{ color: "var(--primary-text-color)" }}>
          У вас нет транзакций
        </h3>
      ) : (
        <TransferList
          style={{ width: "100%", maxWidth: "600px" }}
          transfers={transfs}
        />
      )}
    </Container>
  );
};

export default TransactionsHistory;
