import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";

import { cn } from "@/lib/utils/cn";
import { radius, shadows } from "@/theme";

export type SurfaceVariant = "glass" | "strong" | "solid" | "sunken";

const variantClasses: Record<SurfaceVariant, string> = {
  glass: "bg-white/55 border border-white/85",
  strong: "bg-white/75 border border-white/90",
  solid: "bg-white border border-white",
  sunken: "bg-sunken border border-white/70",
};

export type SurfaceProps = ViewProps & {
  variant?: SurfaceVariant;
  /** Corner scale; defaults to the 24px card radius. */
  radiusToken?: keyof typeof radius;
  className?: string;
  /** Elevation preset from the theme. */
  elevation?: keyof typeof shadows;
};

/** Translucent card used for the mock's frosted panels. */
export function Surface({
  variant = "glass",
  radiusToken = "card",
  elevation = "card",
  className,
  style,
  children,
  ...rest
}: SurfaceProps) {
  const surfaceStyle: StyleProp<ViewStyle> = [
    { borderRadius: radius[radiusToken] },
    elevation ? shadows[elevation] : null,
    style,
  ];

  return (
    <View className={cn(variantClasses[variant], className)} style={surfaceStyle} {...rest}>
      {children}
    </View>
  );
}

/**
 * Native iOS 26 liquid glass where available, falling back to the translucent
 * surface everywhere else (Android, web, older iOS).
 */
export function GlassSurface({ className, style, children, radiusToken = "panel", ...rest }: SurfaceProps) {
  if (isLiquidGlassAvailable()) {
    return (
      <GlassView
        glassEffectStyle="regular"
        style={[{ borderRadius: radius[radiusToken] }, style]}
        className={className}
        {...rest}
      >
        {children}
      </GlassView>
    );
  }

  return (
    <Surface radiusToken={radiusToken} className={className} style={style} {...rest}>
      {children}
    </Surface>
  );
}
