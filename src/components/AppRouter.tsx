import { Routes, Route, Navigate } from "react-router-dom";
import { authRotes, loginRoutes, publicRoutes } from "../routes";
import { ACCOUNTS_ROUTE, SIGN_IN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";

const AppRouter = observer(() => {
  const { user } = useStore();

  return (
    <Routes>
      {user.isAuth &&
        authRotes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

      {!user.isAuth &&
        loginRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      <Route
        path="*"
        element={<Navigate to={user.isAuth ? ACCOUNTS_ROUTE : SIGN_IN_ROUTE} />}
      />
    </Routes>
  );
});

export default AppRouter;
