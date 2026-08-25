import { View, Text, ScrollView } from "react-native";
import { useAuth } from "../../lib/AuthContext";
import { useCurrentUser, useUserStats } from "../../hooks";
import { Avatar, Card, Button } from "../../components";
import { colors, typography, borderRadius, shadows } from "../../lib/theme";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user, loading } = useCurrentUser();
  const { stats } = useUserStats(user?.id || null);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.onSurfaceVariant }}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.onSurfaceVariant }}>Please sign in</Text>
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
          Profile
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 16,
        }}
      >
        {/* Profile Header Card */}
        <Card>
          <View style={{ alignItems: "center", paddingVertical: 20 }}>
            <Avatar
              firstName={user.firstName}
              lastName={user.lastName}
              imageUrl={user.profileImageUrl}
              size={100}
            />
            <Text
              style={{
                fontSize: typography.headlineMd.fontSize,
                fontWeight: typography.headlineMd.fontWeight,
                color: colors.primary,
                marginTop: 16,
                lineHeight: typography.headlineMd.lineHeight,
              }}
            >
              {user.displayName || `${user.firstName} ${user.lastName}`}
            </Text>
            <Text
              style={{
                fontSize: typography.bodyMd.fontSize,
                color: colors.onSurfaceVariant,
                marginTop: 4,
                lineHeight: typography.bodyMd.lineHeight,
              }}
            >
              {user.email}
            </Text>
            {user.bio && (
              <Text
                style={{
                  fontSize: typography.bodyMd.fontSize,
                  color: colors.onSurfaceVariant,
                  marginTop: 12,
                  textAlign: "center",
                  lineHeight: typography.bodyMd.lineHeight,
                }}
              >
                {user.bio}
              </Text>
            )}
          </View>
        </Card>

        {/* Stats Card */}
        <Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 8,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 28, fontWeight: "bold", color: colors.secondary }}>
                {stats?.posts || 0}
              </Text>
              <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.onSurfaceVariant, marginTop: 4 }}>
                Posts
              </Text>
            </View>
            <View style={{ width: 1, backgroundColor: colors.outlineVariant }} />
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 28, fontWeight: "bold", color: colors.secondary }}>
                {stats?.prayers || 0}
              </Text>
              <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.onSurfaceVariant, marginTop: 4 }}>
                Prayers
              </Text>
            </View>
          </View>
        </Card>

        {/* Info Card */}
        <Card>
          <View style={{ gap: 16 }}>
            {user.churchName && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.onSurfaceVariant }}>
                  Church
                </Text>
                <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.primary, fontWeight: "500" }}>
                  {user.churchName}
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.onSurfaceVariant }}>
                Role
              </Text>
              <View
                style={{
                  backgroundColor: colors.tertiaryContainer,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: borderRadius.full,
                }}
              >
                <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.onTertiaryContainer, fontWeight: "500" }}>
                  {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Sign Out Button */}
        <Button
          title="Sign Out"
          onPress={() => signOut()}
          variant="secondary"
        />
      </ScrollView>
    </View>
  );
}
