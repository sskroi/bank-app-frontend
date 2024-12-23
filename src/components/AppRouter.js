import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRotes, loginRoutes, publicRoutes } from "../routes";
import { Context } from "../index";
import { ACCOUNTS_ROUTE, SIGN_IN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth &&
        authRotes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}

      {!user.isAuth &&
        loginRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}

      <Route
        path="*"
        element={<Navigate to={user.isAuth ? ACCOUNTS_ROUTE : SIGN_IN_ROUTE} />}
      />
    </Routes>
  );
});

export default AppRouter;
