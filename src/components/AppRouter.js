import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRotes, publicRoutes } from "../routes";
import { Context } from "../index.js";
import { SIGN_IN_ROUTE } from "../utils/consts.js";

const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth &&
        authRotes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}

      <Route path="*" element={<Navigate to={SIGN_IN_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
