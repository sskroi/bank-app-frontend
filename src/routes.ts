import Accounts from "./pages/Accounts";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import TransactionsHistory from "./pages/TransactionsHistory";
import {
  ACCOUNTS_ROUTE,
  HISTORY_ROUTE,
  PROFILE_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "./utils/consts";

interface RouteItem {
  path: string;
  Component: React.ElementType;
}

export const authRotes: RouteItem[] = [
  {
    path: ACCOUNTS_ROUTE,
    Component: Accounts,
  },
  {
    path: HISTORY_ROUTE,
    Component: TransactionsHistory,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
];

export const loginRoutes: RouteItem[] = [
  {
    path: SIGN_IN_ROUTE,
    Component: Auth,
  },
  {
    path: SIGN_UP_ROUTE,
    Component: Auth,
  },
];

export const publicRoutes: RouteItem[] = [];
