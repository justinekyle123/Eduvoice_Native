import { Pressable, Text, ActivityIndicator } from "react-native";
import { colors, typography, borderRadius, shadows } from "../lib/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
}: ButtonProps) {
  const getStyle = () => {
    if (disabled || loading) {
      return {
        backgroundColor: colors.surfaceContainerHigh,
        borderWidth: 0,
      };
    }

    switch (variant) {
      case "primary":
        return {
          backgroundColor: colors.primary,
          borderWidth: 0,
        };
      case "secondary":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.secondary,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
        };
      default:
        return {
          backgroundColor: colors.primary,
          borderWidth: 0,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "secondary":
        return colors.secondary;
      case "ghost":
        return colors.onTertiaryContainer;
      default:
        return colors.onPrimary;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        ...getStyle(),
        borderRadius: borderRadius.DEFAULT,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: fullWidth ? "100%" : undefined,
        opacity: disabled || loading ? 0.6 : pressed ? 0.9 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      {loading && (
        <ActivityIndicator
          color={getTextColor()}
          size="small"
          style={{ marginRight: 8 }}
        />
      )}
      <Text
        style={{
          color: getTextColor(),
          fontSize: typography.labelMd.fontSize,
          fontWeight: typography.labelMd.fontWeight,
          letterSpacing: typography.labelMd.letterSpacing,
        }}
      >
        {loading ? "Loading..." : title}
      </Text>
    </Pressable>
  );
}
