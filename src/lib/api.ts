import { storage } from "./storage";
import { API_BASE_URL } from "./config";

console.log("API_BASE_URL:", API_BASE_URL);

// Storage keys
const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const USER_KEY = "auth_user";

// ========================
// Token Management
// ========================

export async function getAuthToken(): Promise<string | null> {
  try {
    return await storage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function setAuthToken(token: string): Promise<void> {
  await storage.setItem(TOKEN_KEY, token);
}

export async function getRefreshToken(): Promise<string | null> {
  try {
    return await storage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function setRefreshToken(token: string): Promise<void> {
  await storage.setItem(REFRESH_TOKEN_KEY, token);
}

export async function clearTokens(): Promise<void> {
  await storage.removeItem(TOKEN_KEY);
  await storage.removeItem(REFRESH_TOKEN_KEY);
  await storage.removeItem(USER_KEY);
}

export async function getStoredUser(): Promise<any | null> {
  try {
    const userStr = await storage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

export async function setStoredUser(user: any): Promise<void> {
  await storage.setItem(USER_KEY, JSON.stringify(user));
}

// ========================
// API Request Helper
// ========================

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  // Add auth token if available
  const token = await getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  console.log(`[API] ${options.method || "GET"} ${API_BASE_URL}${endpoint}`);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  console.log(`[API] Response ${response.status}:`, response.ok ? "OK" : data);

  if (!response.ok) {
    throw new Error(data.message || data.error || `Request failed (${response.status})`);
  }

  return data as T;
}

// ========================
// Auth API
// ========================

export const authApi = {
  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    phone?: string;
    churchId?: string;
  }) => {
    const response = await request<{
      user: any;
      token: string;
      refreshToken: string;
    }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Store tokens and user
    await setAuthToken(response.token);
    await setRefreshToken(response.refreshToken);
    await setStoredUser(response.user);

    return response;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await request<{
      user: any;
      token: string;
      refreshToken: string;
    }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Store tokens and user
    await setAuthToken(response.token);
    await setRefreshToken(response.refreshToken);
    await setStoredUser(response.user);

    return response;
  },

  logout: async () => {
    try {
      await request("/api/auth/logout", { method: "POST" });
    } finally {
      await clearTokens();
    }
  },

  getMe: () => request<{ user: any }>("/api/auth/me"),
};

// ========================
// Users API
// ========================

export const usersApi = {
  list: (params?: { search?: string; churchId?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.churchId) query.set("churchId", params.churchId);
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    return request<{ users: any[] }>(`/api/users${qs ? `?${qs}` : ""}`);
  },

  get: (id: string) => request<{ user: any }>(`/api/users/${id}`),

  getMe: () => request<{ user: any }>("/api/users/me"),

  create: (data: {
    email: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    profileImageUrl?: string;
    bio?: string;
    churchId?: string;
  }) =>
    request<{ user: any }>("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Record<string, any>) =>
    request<{ user: any }>(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  stats: (id: string) =>
    request<{ stats: { posts: number; prayers: number } }>(
      `/api/users/${id}/stats`
    ),
};

// ========================
// Posts API
// ========================

export const postsApi = {
  list: (params?: {
    churchId?: string;
    groupId?: string;
    authorId?: string;
    type?: string;
    limit?: number;
    offset?: number;
  }) => {
    const query = new URLSearchParams();
    if (params?.churchId) query.set("churchId", params.churchId);
    if (params?.groupId) query.set("groupId", params.groupId);
    if (params?.authorId) query.set("authorId", params.authorId);
    if (params?.type) query.set("type", params.type);
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.offset) query.set("offset", String(params.offset));
    const qs = query.toString();
    return request<{ posts: any[] }>(`/api/posts${qs ? `?${qs}` : ""}`);
  },

  get: (id: string) =>
    request<{ post: any; reactions: any[] }>(`/api/posts/${id}`),

  feed: (userId: string, params?: { limit?: number; offset?: number }) => {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.offset) query.set("offset", String(params.offset));
    const qs = query.toString();
    return request<{ posts: any[] }>(
      `/api/posts/feed/${userId}${qs ? `?${qs}` : ""}`
    );
  },

  create: (data: {
    content: string;
    churchId?: string;
    groupId?: string;
    imageUrl?: string;
    videoUrl?: string;
    type?: string;
    isPublic?: boolean;
    images?: { url: string; type?: string }[];
  }) =>
    request<{ post: any }>("/api/posts", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Record<string, any>) =>
    request<{ post: any }>(`/api/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/api/posts/${id}`, {
      method: "DELETE",
    }),

  react: (id: string, type: string = "amen") =>
    request<{ reaction: any; reacted: boolean }>(`/api/posts/${id}/react`, {
      method: "POST",
      body: JSON.stringify({ type }),
    }),

  reactions: (id: string) =>
    request<{ reactions: any[] }>(`/api/posts/${id}/reactions`),
};

// ========================
// Comments API
// ========================

export const commentsApi = {
  listByPost: (postId: string, params?: { limit?: number; offset?: number }) => {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.offset) query.set("offset", String(params.offset));
    const qs = query.toString();
    return request<{ comments: any[] }>(
      `/api/comments/post/${postId}${qs ? `?${qs}` : ""}`
    );
  },

  get: (id: string) => request<{ comment: any }>(`/api/comments/${id}`),

  create: (
    postId: string,
    data: { content: string; imageUrl?: string; parentId?: string }
  ) =>
    request<{ comment: any }>(`/api/comments/post/${postId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: { content?: string; imageUrl?: string }) =>
    request<{ comment: any }>(`/api/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/api/comments/${id}`, {
      method: "DELETE",
    }),

  react: (id: string, type: string = "amen") =>
    request<{ reaction: any; reacted: boolean }>(`/api/comments/${id}/react`, {
      method: "POST",
      body: JSON.stringify({ type }),
    }),
};

// ========================
// Health
// ========================

export const healthApi = () =>
  request<{ status: string; timestamp: string }>("/api/health");

// Default export for convenience
const api = {
  auth: authApi,
  users: usersApi,
  posts: postsApi,
  comments: commentsApi,
  health: healthApi,
};

export default api;
