import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import "./colors.css";
import AppRouter from "./components/AppRouter.js";
import Header from "./components/Header.jsx";
import { Context } from "./index.js";
import { checkAuth } from "./http/authAPI.js";
import { Spinner } from "react-bootstrap";

function App() {
  const { user } = useContext(Context);
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
