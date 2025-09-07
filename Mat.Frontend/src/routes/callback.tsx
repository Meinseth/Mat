import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userManager } from "../services/userManager";
import { useAuthContext } from "../context/AuthContext";

export default function Callback() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  useEffect(() => {
    userManager.signinRedirectCallback().then((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("token", user.access_token);
      }
      navigate("/", { replace: true });
    });
  }, []);

  return <p>Fullfører innlogging...</p>;
}
