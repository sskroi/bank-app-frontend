import { Container } from "react-bootstrap";
import styles from "./TransactionsHistoryPage.module.scss";
import TransferList from "../components/TransferList";

const TransactionsHistoryPage = () => {
  return (
    <Container className={styles.transactionsHistoryPage}>
      <h2 style={{ color: "var(--primary-text-color)" }}>История транзакций</h2>
      <Container className={styles.historyCont}>
        <TransferList allTransfers />
      </Container>
    </Container>
  );
};

export default TransactionsHistoryPage;
