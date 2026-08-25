import { View, Text, Pressable } from "react-native";
import { colors, typography, borderRadius, shadows } from "../lib/theme";
import { Avatar } from "./Avatar";
import type { Post } from "../types/api";

interface PostCardProps {
  post: Post;
  onReact?: (postId: string, type: string) => void;
  onPress?: (post: Post) => void;
}

const REACTIONS = [
  { type: "amen", emoji: "🙏", label: "Amen" },
  { type: "praise", emoji: "🙌", label: "Praise" },
  { type: "love", emoji: "❤️", label: "Love" },
  { type: "support", emoji: "💪", label: "Support" },
  { type: "pray", emoji: "🤲", label: "Praying" },
];

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
          padding: 16,
          marginBottom: 16,
          ...shadows.ambient,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Avatar
            firstName={post.authorFirstName}
            lastName={post.authorLastName}
            imageUrl={post.authorProfileImage}
            size={40}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={{
                fontSize: typography.labelMd.fontSize,
                fontWeight: typography.labelMd.fontWeight,
                color: colors.primary,
                letterSpacing: typography.labelMd.letterSpacing,
              }}
            >
              {post.authorDisplayName ||
                `${post.authorFirstName} ${post.authorLastName}`}
            </Text>
            <Text
              style={{
                fontSize: typography.caption.fontSize,
                color: colors.onSurfaceVariant,
                marginTop: 2,
                textTransform: "uppercase",
                letterSpacing: 0.05,
              }}
            >
              {formatDate(post.createdAt)}
            </Text>
          </View>
          {badge && (
            <View
              style={{
                backgroundColor: badge.color,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: borderRadius.full,
              }}
            >
              <Text
                style={{
                  color: badge.textColor,
                  fontSize: typography.caption.fontSize,
                  fontWeight: "600",
                }}
              >
                {badge.text}
              </Text>
            </View>
          )}
        </View>

        {/* Content */}
        <Text
          style={{
            fontSize: typography.bodyMd.fontSize,
            color: colors.onSurface,
            lineHeight: typography.bodyMd.lineHeight,
            marginBottom: 16,
          }}
        >
          {post.content}
        </Text>

        {/* Reactions bar */}
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {REACTIONS.map((reaction) => (
            <Pressable
              key={reaction.type}
              onPress={() => onReact?.(post.id, reaction.type)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: borderRadius.full,
                backgroundColor: colors.surfaceContainer,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text style={{ fontSize: 16 }}>{reaction.emoji}</Text>
              <Text
                style={{
                  fontSize: typography.caption.fontSize,
                  color: colors.onSurfaceVariant,
                  fontWeight: "500",
                }}
              >
                {reaction.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Stats */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: colors.outlineVariant,
          }}
        >
          {post.prayerCount > 0 && (
            <Text
              style={{
                fontSize: typography.caption.fontSize,
                color: colors.onSurfaceVariant,
              }}
            >
              🙏 {post.prayerCount} praying
            </Text>
          )}
          <Text
            style={{
              fontSize: typography.caption.fontSize,
              color: colors.onSurfaceVariant,
            }}
          >
            💬 {post.commentCount} comments
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
