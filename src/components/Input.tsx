import { TextInput, Text, View } from "react-native";
import { colors, typography, borderRadius } from "../lib/theme";

interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
  disabled?: boolean;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
  disabled = false,
}: InputProps) {
  return (
    <View style={{ width: "100%" }}>
      {label && (
        <Text
          style={{
            fontSize: typography.labelMd.fontSize,
            fontWeight: typography.labelMd.fontWeight,
            color: colors.primary,
            marginBottom: 6,
            letterSpacing: typography.labelMd.letterSpacing,
          }}
        >
          {label}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.outline}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={!disabled}
        style={{
          borderWidth: 1,
          borderColor: error ? colors.error : colors.outlineVariant,
          borderRadius: borderRadius.DEFAULT,
          padding: 16,
          fontSize: typography.bodyMd.fontSize,
          fontWeight: typography.bodyMd.fontWeight,
          color: colors.onSurface,
          backgroundColor: disabled ? colors.surfaceContainerLow : colors.surfaceContainerLowest,
        }}
      />
      {error && (
        <Text
          style={{
            fontSize: typography.caption.fontSize,
            color: colors.error,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
