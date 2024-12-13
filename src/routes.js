import Auth from "./pages/Auth";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "./utils/consts";
//import Home from "./pages/Home";

export const authRotes = [];

export const publicRoutes = [
  //{
  //  path: "/",
  //  Component: Home,
  //},
  {
    path: SIGN_IN_ROUTE,
    Component: Auth,
  },
  {
    path: SIGN_UP_ROUTE,
    Component: Auth,
  },
];
