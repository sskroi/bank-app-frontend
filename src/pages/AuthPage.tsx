import SignInForm from "../components/authForms/SignInForm";
import SignUpForm from "../components/authForms/SignUpForm";
import styles from "./AuthPage.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ACCOUNTS_ROUTE, SIGN_UP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";

const AuthPage = observer(() => {
  const location = useLocation();
  const { user } = useStore();
  const navigate = useNavigate();

  if (user.isAuth) {
    navigate(ACCOUNTS_ROUTE, { replace: true });
  }

  const isSignUp = location.pathname.startsWith(SIGN_UP_ROUTE);
  const AuthForm = isSignUp ? SignUpForm : SignInForm;

  return (
    <div className={styles.authPage}>
      <AuthForm />
    </div>
  );
});

export default AuthPage;
