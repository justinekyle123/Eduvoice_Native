export type UserProfile = {
  firstName: string;
  fullName: string;
  email: string;
  /** Short label shown under the avatar. */
  role: string;
};

/**
 * Placeholder identity. Auth (and the real profile record) is a later feature,
 * so screens read from one constant for now.
 */
export const mockUser: UserProfile = {
  firstName: "Alex",
  fullName: "Alex Rivera",
  email: "alex@eduvoice.app",
  role: "Learner",
};
