import { cssInterop } from "nativewind";
import { useEffect, useRef, type ReactNode } from "react";
import { Animated, Easing, Platform, type StyleProp, type ViewStyle } from "react-native";

/**
 * Small set of declarative loop animations built on the built-in Animated API.
 * They cover the mock's motion (float, pulse, twinkle, screen enter) without
 * pulling the reanimated worklet runtime into the bundle.
 */
const useNativeDriver = Platform.OS !== "web";

/**
 * NativeWind only knows how to map `className` for core components, so
 * `Animated.View` is registered explicitly — that keeps layout classes working
 * on the animated wrappers.
 */
const AnimatedView = cssInterop(Animated.View, { className: "style" });

type MotionProps = {
  children?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  delay?: number;
};

/** Entrance used when a screen mounts. */
export function FadeInUp({
  children,
  className,
  style,
  duration = 450,
  delay = 0,
  distance = 10,
}: MotionProps & { distance?: number }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.bezier(0.2, 0.7, 0.2, 1),
      useNativeDriver,
    });
    animation.start();
    return () => animation.stop();
  }, [delay, duration, progress]);

  return (
    <AnimatedView
      className={className}
      style={[
        style,
        {
          opacity: progress,
          transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
        },
      ]}
    >
      {children}
    </AnimatedView>
  );
}

/** Gentle vertical drift for mascots, orbs and floating tool chips. */
export function FloatingView({
  children,
  className,
  style,
  amplitude = 8,
  duration = 5000,
  delay = 0,
}: MotionProps & { amplitude?: number }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: duration / 2,
          delay,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [delay, duration, progress]);

  return (
    <AnimatedView
      className={className}
      style={[
        style,
        { transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, -amplitude] }) }] },
      ]}
    >
      {children}
    </AnimatedView>
  );
}

/** Expanding hoop that signals "Eduvoice is listening". */
export function PulseRing({
  className,
  style,
  duration = 2000,
  delay = 0,
  active = true,
  children,
}: Omit<MotionProps, "children"> & { active?: boolean; children?: ReactNode }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) {
      progress.setValue(0);
      return;
    }

    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [active, delay, duration, progress]);

  if (!active) {
    return children ? <>{children}</> : null;
  }

  return (
    <AnimatedView
      className={className}
      style={[
        style,
        {
          opacity: progress.interpolate({ inputRange: [0, 0.35, 1], outputRange: [0, 0.75, 0] }),
          transform: [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1.2] }) }],
        },
      ]}
    >
      {children}
    </AnimatedView>
  );
}

/** Sparkle: soft scale + rotation + opacity, matching the mock's twinkles. */
export function Twinkle({ children, className, style, duration = 2600, delay = 0 }: MotionProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: duration / 2,
          delay,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [delay, duration, progress]);

  return (
    <AnimatedView
      className={className}
      style={[
        style,
        {
          opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0.55, 1] }),
          transform: [
            { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1.15] }) },
            { rotate: progress.interpolate({ inputRange: [0, 1], outputRange: ["-6deg", "12deg"] }) },
          ],
        },
      ]}
    >
      {children}
    </AnimatedView>
  );
}
