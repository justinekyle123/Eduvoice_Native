import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../lib/AuthContext";
import { useUserFeed, useCurrentUser, useReactToPost } from "../../hooks";
import { PostCard, Avatar, Button } from "../../components";
import { colors, typography, borderRadius, shadows } from "../../lib/theme";
import type { Post } from "../../types/api";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { user, loading: userLoading } = useCurrentUser();
  const { posts, loading, error, refetch } = useUserFeed(user?.id || null);
  const { react } = useReactToPost();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const handleReact = async (postId: string, type: string) => {
    try {
      await react(postId, type);
    } catch (err) {
      console.error("Reaction failed:", err);
    }
  };

  if (userLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background, padding: 24 }}>
        <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.onSurfaceVariant, textAlign: "center" }}>
          Please sign in to continue
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: colors.surfaceContainerLowest,
          paddingTop: 60,
          paddingBottom: 16,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.outlineVariant,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: typography.headlineLgMobile.fontSize,
            fontWeight: typography.headlineLgMobile.fontWeight,
            color: colors.primary,
            lineHeight: typography.headlineLgMobile.lineHeight,
          }}
        >
          Sanctuary
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Avatar
            firstName={user.firstName}
            lastName={user.lastName}
            imageUrl={user.profileImageUrl}
            size={36}
          />
          <TouchableOpacity onPress={() => signOut()}>
            <Text style={{ fontSize: typography.labelMd.fontSize, color: colors.secondary, fontWeight: "600" }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scripture of the Day Card */}
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: borderRadius.lg,
          overflow: "hidden",
          ...shadows.ambient,
        }}
      >
        <View
          style={{
            backgroundColor: colors.primaryContainer,
            padding: 24,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.surfaceContainerLowest,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: borderRadius.full,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: typography.caption.fontSize,
                fontWeight: "600",
                color: colors.secondary,
                textTransform: "uppercase",
                letterSpacing: 0.1,
              }}
            >
              Scripture of the Day
            </Text>
          </View>
          <Text
            style={{
              fontSize: typography.headlineLgMobile.fontSize,
              fontWeight: typography.headlineLgMobile.fontWeight,
              color: colors.onPrimaryContainer,
              textAlign: "center",
              fontStyle: "italic",
              lineHeight: typography.headlineLgMobile.lineHeight,
              marginBottom: 12,
            }}
          >
            "The Lord is my shepherd, I lack nothing..."
          </Text>
          <Text
            style={{
              fontSize: typography.bodyMd.fontSize,
              color: colors.onPrimaryContainer,
              opacity: 0.8,
            }}
          >
            — Psalm 23:1-2
          </Text>
        </View>
      </View>

      {/* Feed */}
      {loading && !refreshing ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
          <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.error, textAlign: "center", marginBottom: 16 }}>
            {error}
          </Text>
          <Button title="Try Again" onPress={refetch} variant="primary" />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard post={item} onReact={handleReact} />
          )}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 100 }}>
              <Text style={{ fontSize: 48, marginBottom: 16 }}>📝</Text>
              <Text style={{ fontSize: typography.headlineMd.fontSize, color: colors.onSurfaceVariant, marginBottom: 8 }}>
                No posts yet
              </Text>
              <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.outline }}>
                Be the first to share something!
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
