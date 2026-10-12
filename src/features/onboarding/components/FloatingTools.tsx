import { View } from "react-native";

import { FloatingView } from "@/components/animation";
import { Icon, type IconName } from "@/components/icons";
import { shadows } from "@/theme";

const TOOLS: { icon: IconName; className: string; delay: number }[] = [
  { icon: "calendar", className: "left-[2%] top-[16%]", delay: 0 },
  { icon: "check", className: "right-[2%] top-[20%]", delay: 800 },
  { icon: "mail", className: "left-[1%] top-[44%]", delay: 1600 },
  { icon: "document", className: "right-[0%] top-[46%]", delay: 2400 },
];

/** Decorative tools that drift around the robot while Eduvoice gets ready. */
export function FloatingTools() {
  return (
    <View pointerEvents="none" className="absolute inset-0">
      {TOOLS.map((tool) => (
        <FloatingView
          key={tool.icon}
          className={`absolute h-[46px] w-[46px] items-center justify-center rounded-control border border-white/85 bg-white/70 ${tool.className}`}
          style={shadows.soft}
          amplitude={7}
          duration={3500}
          delay={tool.delay}
        >
          <Icon name={tool.icon} size={19} color="#6286ce" />
        </FloatingView>
      ))}
    </View>
  );
}
