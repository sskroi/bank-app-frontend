import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import UserStore from "./store/UserStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>,
);
