import { Routes, Route, Navigate } from "react-router-dom";
import { authRotes, publicRoutes } from "../routes";

const AppRouter = () => {
  const isAuth = false;

  return (
    <Routes>
      {isAuth &&
        authRotes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}

      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
};

export default AppRouter;
