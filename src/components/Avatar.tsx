import { View, Text } from "react-native";
import { colors, borderRadius } from "../lib/theme";

interface AvatarProps {
  firstName?: string;
  lastName?: string;
  imageUrl?: string | null;
  size?: number;
  variant?: "primary" | "secondary" | "tertiary";
}

export function Avatar({
  firstName,
  lastName,
  imageUrl,
  size = 44,
  variant = "primary",
}: AvatarProps) {
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}` || "?";

  const getBackgroundColor = () => {
    switch (variant) {
      case "secondary":
        return colors.secondaryContainer;
      case "tertiary":
        return colors.tertiaryContainer;
      default:
        return colors.primaryContainer;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "secondary":
        return colors.onSecondaryContainer;
      case "tertiary":
        return colors.onTertiaryContainer;
      default:
        return colors.onPrimaryContainer;
    }
  };

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: borderRadius.full,
        backgroundColor: getBackgroundColor(),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: getTextColor(),
          fontSize: size * 0.4,
          fontWeight: "700",
        }}
      >
        {initials}
      </Text>
    </View>
  );
}
