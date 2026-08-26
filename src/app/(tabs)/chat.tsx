import { View, Text } from "react-native";
import { colors, typography, borderRadius } from "../../lib/theme";

export default function ChatScreen() {
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
          Chat
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: borderRadius.full,
            backgroundColor: colors.tertiaryContainer,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 40 }}>💬</Text>
        </View>
        <Text
          style={{
            fontSize: typography.headlineMd.fontSize,
            fontWeight: typography.headlineMd.fontWeight,
            color: colors.primary,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Messages
        </Text>
        <Text
          style={{
            fontSize: typography.bodyMd.fontSize,
            color: colors.onSurfaceVariant,
            textAlign: "center",
            lineHeight: typography.bodyMd.lineHeight,
          }}
        >
          Connect with your church community through direct messages
        </Text>
      </View>
    </View>
  );
}
