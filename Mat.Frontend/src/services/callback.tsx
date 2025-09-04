import { useEffect } from "react";
import userManager from "./authService";

export function Callback() {
  useEffect(() => {
    userManager.signinRedirectCallback().then((user) => {
      localStorage.setItem("token", user.access_token);
      window.location.href = "/";
    });
  }, []);

  return <div>Loading...</div>;
}
