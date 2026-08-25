import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../lib/AuthContext";
import { usersApi } from "../lib/api";
import type { User } from "../types/api";

// ========================
// useCurrentUser - Get the logged-in user's profile
// ========================
export function useCurrentUser() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    // Fetch full user profile from API
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await usersApi.get(authUser.id);
        setUser(response.user);
      } catch (err: any) {
        // If API fails, use auth user data
        setUser(authUser as User);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [authUser, authLoading]);

  const refetch = useCallback(async () => {
    if (!authUser) return;
    try {
      setLoading(true);
      const response = await usersApi.get(authUser.id);
      setUser(response.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  return { user, loading, error, refetch };
}

// ========================
// useUser - Get a user by ID
// ========================
export function useUser(userId: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await usersApi.get(userId);
        setUser(response.user);
      } catch (err: any) {
        setError(err.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
}

// ========================
// useUsers - Search/list users
// ========================
export function useUsers(params?: { search?: string; churchId?: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await usersApi.list(params);
        setUsers(response.users);
      } catch (err: any) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [params?.search, params?.churchId]);

  return { users, loading, error };
}

// ========================
// useCreateUser - Create user profile
// ========================
export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = useCallback(
    async (data: {
      email: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      profileImageUrl?: string;
      bio?: string;
      churchId?: string;
    }) => {
      try {
        setLoading(true);
        setError(null);
        const response = await usersApi.create(data);
        return response.user;
      } catch (err: any) {
        setError(err.message || "Failed to create user");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createUser, loading, error };
}

// ========================
// useUpdateUser - Update user profile
// ========================
export function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = useCallback(
    async (id: string, data: Record<string, any>) => {
      try {
        setLoading(true);
        setError(null);
        const response = await usersApi.update(id, data);
        return response.user;
      } catch (err: any) {
        setError(err.message || "Failed to update user");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateUser, loading, error };
}

// ========================
// useUserStats - Get user statistics
// ========================
export function useUserStats(userId: string | null) {
  const [stats, setStats] = useState<{ posts: number; prayers: number } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await usersApi.stats(userId);
        setStats(response.stats);
      } catch (err: any) {
        setError(err.message || "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  return { stats, loading, error };
}
