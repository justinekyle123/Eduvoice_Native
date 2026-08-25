// ========================
// Database Types (matches backend schema)
// ========================

export type UserRole = "member" | "leader" | "pastor" | "admin";

export type PostType =
  | "general"
  | "prayer_request"
  | "testimony"
  | "announcement"
  | "sermon_notes"
  | "event_share";

export type ReactionType = "amen" | "praise" | "love" | "support" | "pray";

export type EventType =
  | "service"
  | "bible_study"
  | "prayer_meeting"
  | "fellowship"
  | "outreach"
  | "youth"
  | "other";

export type GroupRole = "member" | "leader" | "admin";

export type FriendStatus = "pending" | "accepted" | "declined";

export type NotificationType =
  | "friend_request"
  | "post_like"
  | "comment"
  | "prayer_support"
  | "event_invite"
  | "group_invite"
  | "mention";

// ========================
// Models
// ========================

export interface Church {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  denomination: string | null;
  serviceTimes: { day: string; time: string }[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string | null;
  profileImageUrl: string | null;
  coverImageUrl: string | null;
  bio: string | null;
  phone: string | null;
  birthday: string | null;
  role: UserRole;
  churchId: string | null;
  isOnline: boolean | null;
  lastSeenAt: string | null;
  createdAt: string;
  updatedAt?: string;
  // Joined fields
  churchName?: string | null;
}

export interface Post {
  id: string;
  authorId: string;
  churchId: string | null;
  groupId: string | null;
  content: string;
  imageUrl: string | null;
  videoUrl: string | null;
  type: PostType;
  isPinned: boolean;
  isPublic: boolean;
  prayerCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  // Joined fields
  authorFirstName?: string;
  authorLastName?: string;
  authorDisplayName?: string;
  authorProfileImage?: string | null;
  authorRole?: UserRole;
  churchName?: string | null;
  groupName?: string | null;
  // Relations
  attachments?: PostAttachment[];
}

export interface PostAttachment {
  id: string;
  postId: string;
  url: string;
  type: string;
  order: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  parentId: string | null;
  content: string;
  imageUrl: string | null;
  reactionCount: number;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
  // Joined fields
  authorFirstName?: string;
  authorLastName?: string;
  authorDisplayName?: string;
  authorProfileImage?: string | null;
  authorRole?: UserRole;
  // Nested replies
  replies?: Comment[];
}

export interface Reaction {
  id: string;
  userId: string;
  postId: string | null;
  commentId: string | null;
  type: ReactionType;
  createdAt: string;
  // Joined fields
  userFirstName?: string;
  userLastName?: string;
  userProfileImage?: string | null;
}

export interface Group {
  id: string;
  churchId: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  coverImageUrl: string | null;
  isPrivate: boolean;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  churchId: string;
  creatorId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  type: EventType;
  location: string | null;
  startDateTime: string;
  endDateTime: string | null;
  isRecurring: boolean;
  recurrenceRule: string | null;
  maxAttendees: number | null;
  attendeeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Sermon {
  id: string;
  churchId: string;
  speakerId: string | null;
  title: string;
  description: string | null;
  scriptureRef: string | null;
  seriesName: string | null;
  audioUrl: string | null;
  videoUrl: string | null;
  notesContent: string | null;
  thumbnailUrl: string | null;
  durationMinutes: number | null;
  sermonDate: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PrayerRequest {
  id: string;
  userId: string;
  churchId: string | null;
  title: string | null;
  content: string;
  isAnonymous: boolean;
  isUrgent: boolean;
  isAnswered: boolean;
  prayerCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  imageUrl: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string | null;
  linkUrl: string | null;
  isRead: boolean;
  actorId: string | null;
  postId: string | null;
  createdAt: string;
}

// ========================
// API Response Types
// ========================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total?: number;
  limit: number;
  offset: number;
}
