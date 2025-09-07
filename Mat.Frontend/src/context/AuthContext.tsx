import { User } from "oidc-client-ts";
import { createContext, useContext, useEffect, useState } from "react";
import { userManager } from "../services/userManager";

type AuthContextType = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Try restoring user from storage on app load
    userManager.getUser().then((storedUser) => {
      if (storedUser) setUser(storedUser);
    });
  }, []);

  const login = async () => {
    await userManager.signinRedirect();
  };

  const logout = async () => {
    await userManager.removeUser();
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
}
