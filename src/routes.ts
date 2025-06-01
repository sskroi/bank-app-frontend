import AccountsPage from "./pages/AccountsPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import TransactionsHistoryPage from "./pages/TransactionsHistoryPage";
import {
  ACCOUNTS_ROUTE,
  HISTORY_ROUTE, NEWS_ROUTE,
  PROFILE_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "./utils/consts";
import NewsPage from "./pages/NewsPage.tsx";

interface RouteItem {
  path: string;
  Component: React.ElementType;
}

export const authRotes: RouteItem[] = [
  {
    path: NEWS_ROUTE,
    Component: NewsPage
  },
  {
    path: ACCOUNTS_ROUTE,
    Component: AccountsPage,
  },
  {
    path: HISTORY_ROUTE,
    Component: TransactionsHistoryPage,
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
];

export const loginRoutes: RouteItem[] = [
  {
    path: SIGN_IN_ROUTE,
    Component: AuthPage,
  },
  {
    path: SIGN_UP_ROUTE,
    Component: AuthPage,
  },
];

export const publicRoutes: RouteItem[] = [];
