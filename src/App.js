import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import "./colors.css";
import AppRouter from "./components/AppRouter.js";
import Header from "./components/header/Header.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
