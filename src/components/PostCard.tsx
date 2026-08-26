import { View, Text, Pressable, Image } from "react-native";
import { colors, typography, borderRadius, shadows } from "../lib/theme";
import { Avatar } from "./Avatar";
import type { Post } from "../types/api";

interface PostCardProps {
  post: Post;
  onReact?: (postId: string, type: string) => void;
  onPress?: (post: Post) => void;
}

function getTypeBadge(type: string) {
  switch (type) {
    case "prayer_request":
      return { text: "Prayer Request", color: colors.tertiaryContainer, textColor: colors.onTertiaryContainer };
    case "testimony":
      return { text: "Testimony", color: colors.secondaryContainer, textColor: colors.onSecondaryContainer };
    case "announcement":
      return { text: "Announcement", color: colors.primaryContainer, textColor: colors.onPrimaryContainer };
    default:
      return null;
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function PostCard({ post, onReact, onPress }: PostCardProps) {
  const badge = getTypeBadge(post.type);

  return (
    <Pressable onPress={() => onPress?.(post)}>
      <View
        style={{
          backgroundColor: colors.surfaceContainerLowest,
          borderRadius: borderRadius.lg,
          marginBottom: 12,
          overflow: "hidden",
          ...shadows.ambient,
        }}
      >
        {/* Header: Author info */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
          }}
        >
          <Avatar
            firstName={post.authorFirstName}
            lastName={post.authorLastName}
            imageUrl={post.authorProfileImage}
            size={40}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: colors.primary,
              }}
            >
              {post.authorDisplayName ||
                `${post.authorFirstName} ${post.authorLastName}`}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: colors.onSurfaceVariant,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginTop: 1,
              }}
            >
              {formatDate(post.createdAt)}
              {badge && ` • ${badge.text}`}
            </Text>
          </View>
          <Pressable style={{ padding: 4 }}>
            <Text style={{ fontSize: 18, color: colors.onSurfaceVariant }}>⋮</Text>
          </Pressable>
        </View>

        {/* Post Image */}
        {post.imageUrl && (
          <Image
            source={{ uri: post.imageUrl }}
            style={{
              width: "100%",
              aspectRatio: 1,
              backgroundColor: colors.surfaceContainer,
            }}
            resizeMode="cover"
          />
        )}

        {/* Action Bar: Like, Comment, Send, Bookmark */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingTop: 10,
            paddingBottom: 4,
          }}
        >
          <Pressable
            onPress={() => onReact?.(post.id, "amen")}
            style={({ pressed }) => ({
              marginRight: 16,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text style={{ fontSize: 26, color: colors.onSurfaceVariant }}>
              ♡
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => ({
              marginRight: 16,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text style={{ fontSize: 24, color: colors.onSurfaceVariant }}>
              💬
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => ({
              marginRight: 16,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text style={{ fontSize: 22, color: colors.onSurfaceVariant }}>
              ↗
            </Text>
          </Pressable>
          <View style={{ flex: 1 }} />
          <Pressable
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text style={{ fontSize: 22, color: colors.onSurfaceVariant }}>
              🔖
            </Text>
          </Pressable>
        </View>

        {/* Reaction Count */}
        {post.prayerCount > 0 && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: colors.primary,
              paddingHorizontal: 12,
              paddingBottom: 4,
            }}
          >
            {post.prayerCount} Amens
          </Text>
        )}

        {/* Content */}
        <View style={{ paddingHorizontal: 12, paddingBottom: 4 }}>
          <Text
            style={{
              fontSize: 16,
              color: colors.onSurface,
              lineHeight: 24,
            }}
          >
            {post.content}
          </Text>
        </View>

        {/* View Comments */}
        {post.commentCount > 0 && (
          <Pressable style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
            <Text
              style={{
                fontSize: 12,
                color: colors.onSurfaceVariant,
                fontWeight: "400",
              }}
            >
              View all {post.commentCount} comments
            </Text>
          </Pressable>
        )}

        {/* Bottom spacer if no comments */}
        {post.commentCount === 0 && (
          <View style={{ height: 8 }} />
        )}
      </View>
    </Pressable>
  );
}
