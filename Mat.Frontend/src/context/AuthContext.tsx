import { createContext, useContext, useEffect, useState } from "react";
import { ApiClient, type UserDto } from "../services/ApiClient";

type AuthContextType = {
  user: UserDto | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserDto | null) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const api = new ApiClient(undefined, {
    fetch: (input, init) => {
      return window.fetch(input, {
        ...init,
        credentials: "include",
      });
    },
  });
  useEffect(() => {
    api
      .getApiUserMe()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async () => {
    window.location.href = "api/auth/login";
  };

  const logout = async () => {
    window.location.href = "api/auth/logout";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, loading }}>
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
