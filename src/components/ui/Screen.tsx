import type { ReactNode } from "react";
import { ScrollView, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

import { cn } from "@/lib/utils/cn";
import { screenPadding } from "@/theme";

import { AppBackground, type AppBackgroundVariant } from "./AppBackground";

export type ScreenProps = {
  children: ReactNode;
  /** Wrap the content in a ScrollView (default true). */
  scroll?: boolean;
  /** Render the layered gradient canvas behind the content. */
  background?: AppBackgroundVariant | false;
  texture?: boolean;
  /** Apply the shared screen gutters. */
  padded?: boolean;
  edges?: readonly Edge[];
  className?: string;
  contentClassName?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

/**
 * Standard page shell: gradient canvas, safe-area insets and either a scrolling
 * or fixed content area.
 */
export function Screen({
  children,
  scroll = true,
  background = "shell",
  texture = true,
  padded = true,
  edges = ["top", "bottom"],
  className,
  contentClassName,
  contentContainerStyle,
}: ScreenProps) {
  const padding = padded
    ? {
        paddingHorizontal: screenPadding.horizontal,
        paddingTop: screenPadding.top,
        paddingBottom: screenPadding.bottom,
      }
    : null;

  return (
    <View className={cn("flex-1", className)}>
      {background ? <AppBackground variant={background} showTexture={texture} /> : null}
      <SafeAreaView className="flex-1" edges={edges}>
        {scroll ? (
          <ScrollView
            className="flex-1"
            contentContainerStyle={[{ flexGrow: 1 }, padding, contentContainerStyle]}
            contentContainerClassName={cn("grow", contentClassName)}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View className={cn("flex-1", contentClassName)} style={[padding, contentContainerStyle]}>
            {children}
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
