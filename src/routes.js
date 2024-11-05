import Auth from "./pages/Auth";
import Home from "./pages/Home";

export const authRotes = [];

export const publicRoutes = [
  //{
  //  path: "/",
  //  Component: Home,
  //},
  {
    path: "/sign-in",
    Component: Auth,
  },
  {
    path: "/sign-up",
    Component: Auth,
  },
];
