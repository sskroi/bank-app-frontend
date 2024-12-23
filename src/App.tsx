import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import "./colors.css";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import { StoreContext } from "./index";
import { checkAuth } from "http/authAPI";
import { Spinner } from "react-bootstrap";

function App() {
  const { user } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth()
      .then(() => {
        user.setAuth(true);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
