import { View, Text, FlatList } from "react-native";
import { Card } from "../../components";
import { colors, typography, borderRadius, shadows } from "../../lib/theme";

const PRAYER_REQUESTS = [
  {
    id: "1",
    title: "Prayer for Healing",
    content: "Please pray for my mother's recovery from surgery.",
    prayerCount: 24,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Job Interview",
    content: "I have a big interview tomorrow. Praying for God's favor!",
    prayerCount: 12,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Community Outreach",
    content: "Praying for our upcoming food drive to bless our neighbors.",
    prayerCount: 30,
    createdAt: new Date().toISOString(),
  },
];

export default function PrayersScreen() {
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
          Prayer
        </Text>
      </View>

      <FlatList
        data={PRAYER_REQUESTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <Card>
            <View style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: borderRadius.full,
                    backgroundColor: colors.tertiaryContainer,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>🙏</Text>
                </View>
                <Text
                  style={{
                    fontSize: typography.labelMd.fontSize,
                    fontWeight: typography.labelMd.fontWeight,
                    color: colors.primary,
                    letterSpacing: typography.labelMd.letterSpacing,
                  }}
                >
                  {item.title}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: typography.bodyMd.fontSize,
                  color: colors.onSurface,
                  lineHeight: typography.bodyMd.lineHeight,
                }}
              >
                {item.content}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.secondaryContainer,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: borderRadius.full,
                  }}
                >
                  <Text
                    style={{
                      fontSize: typography.caption.fontSize,
                      color: colors.onSecondaryContainer,
                      fontWeight: "600",
                    }}
                  >
                    🙏 {item.prayerCount} praying
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 100 }}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>🕊️</Text>
            <Text style={{ fontSize: typography.headlineMd.fontSize, color: colors.onSurfaceVariant, marginBottom: 8 }}>
              No prayer requests yet
            </Text>
            <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.outline }}>
              Share your prayer needs with the community
            </Text>
          </View>
        }
      />
    </View>
  );
}
