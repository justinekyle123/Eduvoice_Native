import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../lib/AuthContext";
import { Button, Input } from "../../components";
import { colors, typography, borderRadius, shadows } from "../../lib/theme";

export default function SignUpScreen() {
  const { signUp, user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSignUpPress = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await signUp({
        firstName,
        lastName,
        email,
        password,
      });
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingVertical: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={{ alignItems: "center", marginBottom: 48 }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: borderRadius.xl,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
              ...shadows.ambient,
            }}
          >
            <Text style={{ fontSize: 40 }}>⛪</Text>
          </View>
          <Text
            style={{
              fontSize: typography.headlineLg.fontSize,
              fontWeight: typography.headlineLg.fontWeight,
              color: colors.primary,
              marginBottom: 8,
              lineHeight: typography.headlineLg.lineHeight,
            }}
          >
            Join Sanctuary
          </Text>
          <Text
            style={{
              fontSize: typography.bodyMd.fontSize,
              color: colors.onSurfaceVariant,
              lineHeight: typography.bodyMd.lineHeight,
            }}
          >
            Create your church community account
          </Text>
        </View>

        {/* Form Card */}
        <View
          style={{
            backgroundColor: colors.surfaceContainerLowest,
            borderRadius: borderRadius.xl,
            padding: 24,
            ...shadows.ambient,
          }}
        >
          <Text
            style={{
              fontSize: typography.headlineMd.fontSize,
              fontWeight: typography.headlineMd.fontWeight,
              color: colors.primary,
              marginBottom: 24,
              lineHeight: typography.headlineMd.lineHeight,
            }}
          >
            Create Account
          </Text>

          <View style={{ gap: 16 }}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Input
                  label="First Name"
                  placeholder="First name"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="Last Name"
                  placeholder="Last name"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>

            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="Min 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {error ? (
              <View
                style={{
                  backgroundColor: colors.errorContainer,
                  borderRadius: borderRadius.DEFAULT,
                  padding: 12,
                }}
              >
                <Text style={{ color: colors.onErrorContainer, fontSize: typography.bodyMd.fontSize }}>
                  {error}
                </Text>
              </View>
            ) : null}

            <Button
              title="Sign Up"
              onPress={onSignUpPress}
              loading={loading}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Link href="/(auth)/sign-in" asChild>
            <Text
              style={{
                color: colors.onSurfaceVariant,
                fontSize: typography.bodyMd.fontSize,
                lineHeight: typography.bodyMd.lineHeight,
              }}
            >
              Already have an account?{" "}
              <Text style={{ color: colors.secondary, fontWeight: "600" }}>
                Sign In
              </Text>
            </Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
