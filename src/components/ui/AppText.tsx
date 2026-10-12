import { Text, type TextProps } from "react-native";

import { cn } from "@/lib/utils/cn";
import { textVariants, type TextVariant } from "@/theme";

export type TextTone =
  | "ink"
  | "inkStrong"
  | "muted"
  | "soft"
  | "faint"
  | "accent"
  | "accentInk"
  | "navy"
  | "inverse"
  | "success";

/** Colours stay in NativeWind land so they can be overridden per screen. */
const toneClasses: Record<TextTone, string> = {
  ink: "text-ink",
  inkStrong: "text-ink-strong",
  muted: "text-muted",
  soft: "text-muted-soft",
  faint: "text-muted-faint",
  accent: "text-accent-deep",
  accentInk: "text-accent-ink",
  navy: "text-navy",
  inverse: "text-white",
  success: "text-success",
};

export type AppTextProps = TextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  className?: string;
};

/**
 * Typography entry point: `variant` picks a Manrope weight + size scale and
 * `tone` picks a colour. Layout can still be tweaked with `className`.
 */
export function AppText({ variant = "body", tone = "ink", className, style, ...rest }: AppTextProps) {
  return <Text className={cn(toneClasses[tone], className)} style={[textVariants[variant], style]} {...rest} />;
}
