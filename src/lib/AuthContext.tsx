import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  getAuthToken,
  getStoredUser,
  setStoredUser,
  clearTokens,
  authApi,
} from "./api";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string | null;
  profileImageUrl: string | null;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    phone?: string;
    churchId?: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getAuthToken();
      if (token) {
        console.log("[Auth] Found stored token, verifying...");
        const response = await authApi.getMe();
        console.log("[Auth] Token valid, user:", response.user.email);
        setUser(response.user);
      } else {
        console.log("[Auth] No stored token");
        // Try to get stored user as fallback
        const storedUser = await getStoredUser();
        if (storedUser) {
          console.log("[Auth] Using stored user:", storedUser.email);
          setUser(storedUser);
        }
      }
    } catch (error) {
      console.log("[Auth] Token invalid, clearing...");
      // Token invalid, clear everything
      await clearTokens();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log("[Auth] Signing in:", email);
    const response = await authApi.login({ email, password });
    console.log("[Auth] Login successful, setting user:", response.user.email);
    setUser(response.user);
  };

  const signUp = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    phone?: string;
    churchId?: string;
  }) => {
    console.log("[Auth] Registering:", data.email);
    const response = await authApi.register(data);
    console.log("[Auth] Registration successful, setting user:", response.user.email);
    setUser(response.user);
  };

  const signOut = async () => {
    console.log("[Auth] Signing out");
    await authApi.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const response = await authApi.getMe();
      setUser(response.user);
      await setStoredUser(response.user);
    } catch (error) {
      console.error("[Auth] Failed to refresh user:", error);
    }
  };

  console.log("[Auth] State:", { user: user?.email, loading });

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
