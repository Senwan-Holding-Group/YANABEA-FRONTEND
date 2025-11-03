import { useAuth } from "@/api/Auth/useAuth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./form/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [navigate, from, token]);
  
  return (
    <div className="bg-Primary-25 flex items-center justify-center w-screen h-dvh">
      {token === null && <LoginForm />}
    
    </div>
  );
};

export default LoginPage;
