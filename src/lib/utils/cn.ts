export type ClassValue = string | false | null | undefined;

/** Joins conditional NativeWind class names. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
