import { colors } from "@/theme";

import { icons, type IconName } from "./registry";

export type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

/** Renders a Lucide line icon with the design's 1.8px rounded stroke. */
export function Icon({ name, size = 18, color = colors.ink.base, strokeWidth = 1.8 }: IconProps) {
  const Glyph = icons[name];
  return <Glyph size={size} color={color} strokeWidth={strokeWidth} />;
}
