import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import "./colors.css";
import AppRouter from "./components/AppRouter.js";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
