import { useState, useEffect, useCallback } from "react";
import { postsApi } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import type { Post } from "../types/api";

// ========================
// usePosts - Get posts feed
// ========================
export function usePosts(params?: {
  churchId?: string;
  groupId?: string;
  type?: string;
  limit?: number;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await postsApi.list(params);
      setPosts(response.posts);
    } catch (err: any) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [params?.churchId, params?.groupId, params?.type, params?.limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const refetch = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch };
}

// ========================
// useUserFeed - Get personalized feed
// ========================
export function useUserFeed(userId: string | null, limit?: number) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await postsApi.feed(userId, { limit });
      setPosts(response.posts);
    } catch (err: any) {
      setError(err.message || "Failed to fetch feed");
    } finally {
      setLoading(false);
    }
  }, [userId, limit]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const refetch = useCallback(() => {
    fetchFeed();
  }, [fetchFeed]);

  return { posts, loading, error, refetch };
}

// ========================
// usePost - Get single post
// ========================
export function usePost(postId: string | null) {
  const [post, setPost] = useState<Post | null>(null);
  const [reactions, setReactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!postId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await postsApi.get(postId);
      setPost(response.post);
      setReactions(response.reactions);
    } catch (err: any) {
      setError(err.message || "Failed to fetch post");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const refetch = useCallback(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, reactions, loading, error, refetch };
}

// ========================
// useCreatePost - Create a new post
// ========================
export function useCreatePost() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = useCallback(
    async (data: {
      content: string;
      churchId?: string;
      groupId?: string;
      type?: string;
      images?: { url: string; type?: string }[];
    }) => {
      if (!user) {
        throw new Error("Must be logged in to create a post");
      }

      try {
        setLoading(true);
        setError(null);
        const response = await postsApi.create(data);
        return response.post;
      } catch (err: any) {
        setError(err.message || "Failed to create post");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return { createPost, loading, error };
}

// ========================
// useUpdatePost - Update a post
// ========================
export function useUpdatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePost = useCallback(
    async (id: string, data: Record<string, any>) => {
      try {
        setLoading(true);
        setError(null);
        const response = await postsApi.update(id, data);
        return response.post;
      } catch (err: any) {
        setError(err.message || "Failed to update post");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updatePost, loading, error };
}

// ========================
// useDeletePost - Delete a post
// ========================
export function useDeletePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePost = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await postsApi.delete(id);
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to delete post");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deletePost, loading, error };
}

// ========================
// useReactToPost - Toggle reaction on a post
// ========================
export function useReactToPost() {
  const [loading, setLoading] = useState(false);

  const react = useCallback(async (postId: string, type: string = "amen") => {
    try {
      setLoading(true);
      const response = await postsApi.react(postId, type);
      return response;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { react, loading };
}
