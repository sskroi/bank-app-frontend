import Accounts from "./pages/Accounts";
import Auth from "./pages/Auth";
import { ACCOUNTS_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "./utils/consts";

export const authRotes = [
  {
    path: ACCOUNTS_ROUTE,
    Component: Accounts,
  },
];

export const publicRoutes = [
  {
    path: SIGN_IN_ROUTE,
    Component: Auth,
  },
  {
    path: SIGN_UP_ROUTE,
    Component: Auth,
  },
];
