import { useState, useEffect, useCallback } from "react";
import { commentsApi } from "../lib/api";
import type { Comment } from "../types/api";

// ========================
// useComments - Get comments for a post
// ========================
export function useComments(postId: string | null) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await commentsApi.listByPost(postId);
        setComments(response.comments);
      } catch (err: any) {
        setError(err.message || "Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const refetch = useCallback(() => {
    if (!postId) return;
    setLoading(true);
    commentsApi
      .listByPost(postId)
      .then((response) => setComments(response.comments))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [postId]);

  return { comments, loading, error, refetch };
}

// ========================
// useCreateComment - Create a comment
// ========================
export function useCreateComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = useCallback(
    async (
      postId: string,
      data: {
        content: string;
        imageUrl?: string;
        parentId?: string;
      }
    ) => {
      try {
        setLoading(true);
        setError(null);
        const response = await commentsApi.create(postId, data);
        return response.comment;
      } catch (err: any) {
        setError(err.message || "Failed to create comment");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createComment, loading, error };
}

// ========================
// useUpdateComment - Update a comment
// ========================
export function useUpdateComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateComment = useCallback(
    async (id: string, data: { content?: string; imageUrl?: string }) => {
      try {
        setLoading(true);
        setError(null);
        const response = await commentsApi.update(id, data);
        return response.comment;
      } catch (err: any) {
        setError(err.message || "Failed to update comment");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateComment, loading, error };
}

// ========================
// useDeleteComment - Delete a comment
// ========================
export function useDeleteComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteComment = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await commentsApi.delete(id);
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to delete comment");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteComment, loading, error };
}

// ========================
// useReactToComment - Toggle reaction on a comment
// ========================
export function useReactToComment() {
  const [loading, setLoading] = useState(false);

  const react = useCallback(
    async (commentId: string, type: string = "amen") => {
      try {
        setLoading(true);
        const response = await commentsApi.react(commentId, type);
        return response;
      } catch (err: any) {
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { react, loading };
}
