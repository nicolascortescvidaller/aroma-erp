import { createContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";
import type { AuthUser } from "../types";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("erp_token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rawUser = localStorage.getItem("erp_user");
    if (rawUser) {
      setUser(JSON.parse(rawUser) as AuthUser);
    }
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const payload = response.data.data;
      localStorage.setItem("erp_token", payload.token);
      localStorage.setItem("erp_user", JSON.stringify(payload.user));
      setToken(payload.token);
      setUser(payload.user);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("erp_token");
    localStorage.removeItem("erp_user");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, token, loading, login, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
