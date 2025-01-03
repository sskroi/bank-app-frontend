import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import "./colors.css";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import { Spinner } from "react-bootstrap";
import { checkAuth } from "./api/authAPI";
import useStore from "./hooks/useStore";

function App() {
  const { user } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth()
      .then(() => {
        user.setAuth(true);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Spinner variant="light" animation="border" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
