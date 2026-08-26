import { View, Text, FlatList } from "react-native";
import { Card } from "../../components";
import { colors, typography, borderRadius, shadows } from "../../lib/theme";

const EVENTS = [
  {
    id: "1",
    title: "Sunday Service",
    date: "Every Sunday",
    time: "9:00 AM & 11:00 AM",
    type: "service",
  },
  {
    id: "2",
    title: "Youth Group Meetup",
    date: "This Friday",
    time: "6:30 PM",
    type: "youth",
  },
  {
    id: "3",
    title: "Prayer Meeting",
    date: "Wednesday",
    time: "7:00 PM",
    type: "prayer_meeting",
  },
];

function getEventEmoji(type: string) {
  switch (type) {
    case "service":
      return "⛪";
    case "youth":
      return "🎉";
    case "prayer_meeting":
      return "🙏";
    case "bible_study":
      return "📖";
    case "fellowship":
      return "🤝";
    default:
      return "📅";
  }
}

export default function EventsScreen() {
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
          Events
        </Text>
      </View>

      <FlatList
        data={EVENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: borderRadius.lg,
                  backgroundColor: colors.surfaceContainer,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 28 }}>{getEventEmoji(item.type)}</Text>
              </View>
              <View style={{ flex: 1 }}>
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
                <Text
                  style={{
                    fontSize: typography.caption.fontSize,
                    color: colors.onSurfaceVariant,
                    marginTop: 4,
                  }}
                >
                  {item.date} • {item.time}
                </Text>
              </View>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 100 }}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>📅</Text>
            <Text style={{ fontSize: typography.headlineMd.fontSize, color: colors.onSurfaceVariant, marginBottom: 8 }}>
              No upcoming events
            </Text>
            <Text style={{ fontSize: typography.bodyMd.fontSize, color: colors.outline }}>
              Check back later for church events
            </Text>
          </View>
        }
      />
    </View>
  );
}
