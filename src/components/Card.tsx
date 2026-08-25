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
          padding: 24,
          ...shadows.ambient,
        },
        style,
      ]}
    >
      {title && (
        <Text
          style={{
            fontSize: typography.headlineMd.fontSize,
            fontWeight: typography.headlineMd.fontWeight,
            color: colors.primary,
            marginBottom: 4,
            lineHeight: typography.headlineMd.lineHeight,
          }}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          style={{
            fontSize: typography.bodyMd.fontSize,
            color: colors.onSurfaceVariant,
            marginBottom: 12,
            lineHeight: typography.bodyMd.lineHeight,
          }}
        >
          {subtitle}
        </Text>
      )}
      {children}
    </View>
  );
}
