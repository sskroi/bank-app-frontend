import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import UserStore from "./store/UserStore";
import AccountStore from "./store/AccountsStore";

const userStore = new UserStore();
const accountStore = new AccountStore();

interface StoreContextType {
  user: UserStore;
  accounts: AccountStore;
}

export const StoreContext = createContext<StoreContextType>({
  user: userStore,
  accounts: accountStore,
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <StoreContext.Provider
      value={{
        user: userStore,
        accounts: accountStore,
      }}
    >
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
);
