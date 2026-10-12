import { View } from "react-native";
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from "react-native-svg";

import { FloatingView, Twinkle } from "@/components/animation";

export type RobotMascotProps = {
  /** Smaller pose used on the personalise + preparing screens. */
  compact?: boolean;
  /** Adds the coffee cup (preparing screen). */
  cup?: boolean;
  /** Rendered width in pixels; the viewBox aspect ratio is preserved. */
  size?: number;
  /** Ambient orbs and sparkles around the mascot. */
  showScene?: boolean;
};

/**
 * Eduvoice's robot companion, ported 1:1 from `Design/src/App.tsx`.
 *
 * The mascot keeps the mock's gentle float, and the drop-shadow filter from the
 * web mock stays inside the SVG (the soft ellipse at its base) — a native
 * shadow on this wrapper would paint a visible rectangle behind the robot.
 */
export function RobotMascot({ compact = false, cup = false, size = 300, showScene = !compact }: RobotMascotProps) {
  const height = (size * 260) / 300;

  return (
    <View className="items-center justify-center" style={{ width: size, height }}>
      {showScene ? (
        <>
          <FloatingView
            className="absolute rounded-full bg-[#b2d7fa]/70"
            style={{ width: 45, height: 45, top: "14%", left: "2%" }}
            amplitude={7}
            duration={5200}
          />
          <FloatingView
            className="absolute rounded-full bg-[#e1ccf4]/60"
            style={{ width: 74, height: 74, right: "4%", bottom: "16%" }}
            amplitude={9}
            duration={6000}
          />
          <Twinkle className="absolute right-[8%] top-[12%]" duration={2600}>
            <Sparkle size={23} color="#a99bdf" />
          </Twinkle>
          <Twinkle className="absolute bottom-[13%] left-[12%]" duration={2600} delay={1100}>
            <Sparkle size={15} color="#9fc6ee" />
          </Twinkle>
        </>
      ) : null}

      <FloatingView amplitude={compact ? 6 : 9} duration={compact ? 4400 : 5200}>
        <Svg width={size} height={height} viewBox="0 0 300 260">
          <Defs>
            <LinearGradient id="edu-body" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#ffffff" />
              <Stop offset="0.58" stopColor="#f5f7ff" />
              <Stop offset="1" stopColor="#cbd5f4" />
            </LinearGradient>
            <LinearGradient id="edu-screen" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#11182c" />
              <Stop offset="0.5" stopColor="#18244c" />
              <Stop offset="1" stopColor="#0b1021" />
            </LinearGradient>
            <LinearGradient id="edu-tablet" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#b9d2ff" />
              <Stop offset="0.5" stopColor="#7d9cf7" />
              <Stop offset="1" stopColor="#a68ce7" />
            </LinearGradient>
          </Defs>

          <Ellipse cx={151} cy={225} rx={91} ry={18} fill="#8a91c5" opacity={0.16} />

          {compact ? (
            <>
              <Path d="M76 126c-22 3-35 19-30 39 4 16 18 21 31 14" fill="url(#edu-body)" stroke="#d6dcf1" />
              <Circle cx={53} cy={146} r={13} fill="url(#edu-body)" />
              <Path d="M224 126c22 3 35 19 30 39-4 16-18 21-31 14" fill="url(#edu-body)" stroke="#d6dcf1" />
              <Circle cx={247} cy={146} r={13} fill="url(#edu-body)" />
            </>
          ) : null}

          <G>
            <Path
              d="M99 143c0-26 22-44 51-44s51 18 51 44v43c0 30-22 50-51 50s-51-20-51-50v-43Z"
              fill="url(#edu-body)"
            />
            <Ellipse cx={150} cy={130} rx={66} ry={57} fill="url(#edu-body)" stroke="#e6e9f6" strokeWidth={2} />
            <Rect x={101} y={88} width={98} height={74} rx={35} fill="url(#edu-screen)" />
            <Path
              d="M117 104c21-14 53-16 70-4"
              fill="none"
              stroke="#7187d1"
              opacity={0.22}
              strokeWidth={8}
              strokeLinecap="round"
            />
            <Path
              d="M122 128c0-8 5-14 12-14s12 6 12 14"
              fill="none"
              stroke="#84bfff"
              strokeWidth={5}
              strokeLinecap="round"
            />
            <Path
              d="M155 128c0-8 5-14 12-14s12 6 12 14"
              fill="none"
              stroke="#84bfff"
              strokeWidth={5}
              strokeLinecap="round"
            />

            {compact ? (
              <Path d="M142 139c5 5 12 5 17 0" fill="none" stroke="#e2eaff" strokeWidth={3} strokeLinecap="round" />
            ) : (
              <Rect
                x={113}
                y={183}
                width={75}
                height={54}
                rx={9}
                fill="url(#edu-tablet)"
                transform="rotate(7 113 183)"
              />
            )}

            {!compact ? (
              <>
                <Path
                  d="m135 209 10 9 21-25"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Ellipse cx={93} cy={186} rx={21} ry={28} fill="url(#edu-body)" transform="rotate(-22 93 186)" />
                <Ellipse cx={203} cy={192} rx={21} ry={27} fill="url(#edu-body)" transform="rotate(26 203 192)" />
              </>
            ) : null}

            {cup ? (
              <>
                <Path d="M123 172h52l-7 45h-38l-7-45Z" fill="#718de8" />
                <Path d="M174 180h8c15 0 14 22 1 23h-11" fill="none" stroke="#718de8" strokeWidth={8} />
                <Path
                  d="M142 164c-10-13 10-15 1-30"
                  fill="none"
                  stroke="#d3c7f7"
                  strokeWidth={3}
                  strokeLinecap="round"
                  opacity={0.75}
                />
              </>
            ) : null}
          </G>
        </Svg>
      </FloatingView>
    </View>
  );
}

function Sparkle({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z" fill={color} />
    </Svg>
  );
}
