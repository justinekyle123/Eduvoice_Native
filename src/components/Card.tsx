import { View, Text } from "react-native";
import { ReactNode } from "react";
import { colors, typography, borderRadius, shadows } from "../lib/theme";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  style?: any;
}

export function Card({ children, title, subtitle, style }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surfaceContainerLowest,
          borderRadius: borderRadius.lg,
          padding: 20,
          ...shadows.ambient,
        },
        style,
      ]}
    >
      {title && (
        <Text
          style={{
            fontSize: 24,
            fontWeight: "500",
            color: colors.primary,
            marginBottom: 4,
            lineHeight: 32,
          }}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          style={{
            fontSize: 16,
            color: colors.onSurfaceVariant,
            marginBottom: 12,
            lineHeight: 24,
          }}
        >
          {subtitle}
        </Text>
      )}
      {children}
    </View>
  );
}
