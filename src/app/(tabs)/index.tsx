import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { useAuth } from "../../lib/AuthContext";
import { useUserFeed, useCurrentUser, useReactToPost } from "../../hooks";
import { PostCard, Avatar, Button } from "../../components";
import { colors, typography, borderRadius, shadows } from "../../lib/theme";
import type { Post } from "../../types/api";

// Stories bar data (placeholder)
const STORIES = [
  { id: "me", name: "Your Story", isOwn: true },
  { id: "1", name: "Sarah J." },
  { id: "2", name: "Marcus T." },
  { id: "3", name: "David P." },
  { id: "4", name: "Maria G." },
];

function StoryItem({ name, isOwn }: { name: string; isOwn?: boolean }) {
  return (
    <View style={{ alignItems: "center", width: 72 }}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          padding: 2,
          borderWidth: 2,
          borderColor: colors.secondary,
          marginBottom: 4,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 30,
            backgroundColor: isOwn ? colors.surfaceContainerHigh : colors.tertiaryContainer,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: isOwn ? colors.onSurfaceVariant : colors.onTertiaryContainer,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {isOwn ? "+" : name[0]}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 11,
          color: colors.onSurfaceVariant,
          textAlign: "center",
        }}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
}

function ScriptureCard() {
  return (
    <View
      style={{
        backgroundColor: colors.surfaceContainerLowest,
        borderRadius: borderRadius.lg,
        overflow: "hidden",
        marginHorizontal: 16,
        marginBottom: 16,
        ...shadows.ambient,
      }}
    >
      {/* Scripture Content */}
      <View
        style={{
          height: 256,
          backgroundColor: colors.primaryContainer,
          justifyContent: "center",
          alignItems: "center",
          padding: 32,
        }}
      >
        <View
          style={{
            backgroundColor: colors.surfaceContainerLowest + "e6",
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: borderRadius.full,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 12,
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
            fontSize: 20,
            fontWeight: "500",
            color: colors.onPrimaryContainer,
            textAlign: "center",
            fontStyle: "italic",
            lineHeight: 30,
            marginBottom: 16,
          }}
        >
          &ldquo;The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters...&rdquo;
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.onPrimaryContainer,
            opacity: 0.8,
          }}
        >
          — Psalm 23:1-2
        </Text>
      </View>
      {/* Footer */}
      <View
        style={{
          padding: 12,
          backgroundColor: colors.surfaceContainerLowest,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: colors.outlineVariant + "80",
        }}
      >
        <Text style={{ fontSize: 12, color: colors.onSurfaceVariant }}>
          Shared with love by Pastor David
        </Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 20, color: colors.onSurfaceVariant }}>↗</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
          paddingBottom: 12,
          paddingHorizontal: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Avatar
            firstName={user.firstName}
            lastName={user.lastName}
            imageUrl={user.profileImageUrl}
            size={40}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: colors.primary,
              letterSpacing: -0.5,
            }}
          >
            Sanctuary
          </Text>
        </View>
        <TouchableOpacity onPress={() => signOut()} style={{ padding: 8 }}>
          <Text style={{ fontSize: 20, color: colors.primary }}>☰</Text>
        </TouchableOpacity>
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
          ListHeaderComponent={
            <>
              {/* Stories Bar */}
              <View
                style={{
                  backgroundColor: colors.surfaceContainerLowest,
                  paddingVertical: 12,
                  marginBottom: 8,
                }}
              >
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
                >
                  {STORIES.map((story) => (
                    <StoryItem key={story.id} name={story.name} isOwn={story.isOwn} />
                  ))}
                </ScrollView>
              </View>

              {/* Scripture of the Day */}
              <ScriptureCard />
            </>
          }
          contentContainerStyle={{ paddingBottom: 16 }}
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
