import { View } from "react-native";

import { AppText, Avatar, Chip } from "@/components/ui";

import type { UserProfile } from "../constants";

export type ProfileHeaderProps = {
  user: UserProfile;
};

/** Avatar, name and the (placeholder) account details. */
export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <View className="items-center rounded-panel border border-white/85 bg-white/60 px-6 py-7">
      <Avatar name={user.fullName} size={76} className="border-0" />
      <AppText variant="headingSm" className="mt-4">
        {user.fullName}
      </AppText>
      <AppText variant="bodySm" tone="muted" className="mt-1">
        {user.email}
      </AppText>
      <Chip label={user.role} className="mt-3" />
    </View>
  );
}
