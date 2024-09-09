import { useState } from "react";
import Login from "./Login";
import SignUp from "./Signup";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <>
      {isLogin ? (
        <Login switchToSignUp={() => setIsLogin(false)} />
      ) : (
        <SignUp switchToLogin={() => setIsLogin(true)} />
      )}
    </>
  );
};

export default AuthPage;
