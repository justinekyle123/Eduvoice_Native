# ReadyAlert Database Schema

PostgreSQL database with Drizzle ORM. All primary keys are UUIDs with auto-generated defaults.

---

## Enums

| Enum | Values | Description |
|------|--------|-------------|
| `user_role` | `member`, `leader`, `pastor`, `admin` | User roles within a church |
| `post_type` | `general`, `prayer_request`, `testimony`, `announcement`, `sermon_notes`, `event_share` | Types of posts |
| `reaction_type` | `amen`, `praise`, `love`, `support`, `pray` | Church-themed reactions |
| `event_type` | `service`, `bible_study`, `prayer_meeting`, `fellowship`, `outreach`, `youth`, `other` | Church event types |
| `group_role` | `member`, `leader`, `admin` | Roles within a group |
| `friend_status` | `pending`, `accepted`, `declined` | Friend request status |
| `notification_type` | `friend_request`, `post_like`, `comment`, `prayer_support`, `event_invite`, `group_invite`, `mention` | Notification types |

---

## Tables

### `churches`

Church organizations.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Church ID |
| `name` | VARCHAR(255) | NOT NULL | Church name |
| `slug` | VARCHAR(255) | NOT NULL, UNIQUE | URL-friendly identifier |
| `description` | TEXT | | Church description |
| `address` | TEXT | | Street address |
| `city` | VARCHAR(100) | | City |
| `state` | VARCHAR(100) | | State |
| `zip_code` | VARCHAR(20) | | ZIP code |
| `country` | VARCHAR(100) | DEFAULT `'US'` | Country |
| `phone` | VARCHAR(30) | | Phone number |
| `email` | VARCHAR(255) | | Contact email |
| `website` | VARCHAR(500) | | Website URL |
| `logo_url` | VARCHAR(500) | | Logo image URL |
| `cover_image_url` | VARCHAR(500) | | Cover image URL |
| `denomination` | VARCHAR(100) | | Denomination |
| `service_times` | JSONB | | e.g. `[{ "day": "Sunday", "time": "10:00 AM" }]` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### `users`

Church members linked via Clerk authentication.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | User ID |
| `clerk_id` | VARCHAR(255) | NOT NULL, UNIQUE | Clerk authentication ID |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Email address |
| `first_name` | VARCHAR(100) | NOT NULL | First name |
| `last_name` | VARCHAR(100) | NOT NULL | Last name |
| `display_name` | VARCHAR(100) | | Display name |
| `profile_image_url` | VARCHAR(500) | | Profile picture URL |
| `cover_image_url` | VARCHAR(500) | | Cover image URL |
| `bio` | TEXT | | User biography |
| `phone` | VARCHAR(30) | | Phone number |
| `birthday` | VARCHAR(10) | | Birthday (YYYY-MM-DD) |
| `church_id` | UUID | FK → `churches.id` | Associated church |
| `role` | user_role | NOT NULL, DEFAULT `'member'` | User role |
| `is_online` | BOOLEAN | DEFAULT `false` | Online status |
| `last_seen_at` | TIMESTAMP | | Last seen timestamp |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### `friends`

Friend connections between users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Friend connection ID |
| `user_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Requester |
| `friend_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Recipient |
| `status` | friend_status | NOT NULL, DEFAULT `'pending'` | Connection status |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### `posts`

Status updates, prayer requests, testimonies, and announcements.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Post ID |
| `author_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Post author |
| `church_id` | UUID | FK → `churches.id` | Associated church |
| `group_id` | UUID | FK → `groups.id` | Associated group |
| `content` | TEXT | NOT NULL | Post content |
| `image_url` | VARCHAR(500) | | Primary image URL |
| `video_url` | VARCHAR(500) | | Video URL |
| `type` | post_type | NOT NULL, DEFAULT `'general'` | Post type |
| `is_pinned` | BOOLEAN | DEFAULT `false` | Pinned status |
| `is_public` | BOOLEAN | DEFAULT `true` | Public visibility |
| `prayer_count` | INTEGER | DEFAULT `0` | Number of prayers |
| `comment_count` | INTEGER | DEFAULT `0` | Number of comments |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### `post_attachments`

Multi-image/video support for posts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Attachment ID |
| `post_id` | UUID | NOT NULL, FK → `posts.id` ON DELETE CASCADE | Parent post |
| `url` | VARCHAR(500) | NOT NULL | Media URL |
| `type` | VARCHAR(50) | NOT NULL | Media type (`image`, `video`) |
| `order` | INTEGER | DEFAULT `0` | Display order |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |

---

### `reactions`

Church-themed reactions on posts and comments.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Reaction ID |
| `user_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Reacting user |
| `post_id` | UUID | FK → `posts.id` ON DELETE CASCADE | Target post (nullable) |
| `comment_id` | UUID | FK → `comments.id` ON DELETE CASCADE | Target comment (nullable) |
| `type` | reaction_type | NOT NULL, DEFAULT `'amen'` | Reaction type |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |

---

### `comments`

Comments on posts with nested reply support.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Comment ID |
| `post_id` | UUID | NOT NULL, FK → `posts.id` ON DELETE CASCADE | Parent post |
| `author_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Comment author |
| `parent_id` | UUID | | Parent comment (self-referencing for nested replies) |
| `content` | TEXT | NOT NULL | Comment text |
| `image_url` | VARCHAR(500) | | Attached image URL |
| `reaction_count` | INTEGER | DEFAULT `0` | Number of reactions |
| `reply_count` | INTEGER | DEFAULT `0` | Number of replies |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### `groups`

Ministry teams, small groups, etc.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Group ID |
| `church_id` | UUID | NOT NULL, FK → `churches.id` ON DELETE CASCADE | Parent church |
| `name` | VARCHAR(255) | NOT NULL | Group name |
| `description` | TEXT | | Group description |
| `image_url` | VARCHAR(500) | | Group image URL |
| `cover_image_url` | VARCHAR(500) | | Cover image URL |
| `is_private` | BOOLEAN | DEFAULT `false` | Private group flag |
| `member_count` | INTEGER | DEFAULT `0` | Number of members |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### `group_members`

Membership records for groups.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Membership ID |
| `group_id` | UUID | NOT NULL, FK → `groups.id` ON DELETE CASCADE | Group |
| `user_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Member |
| `role` | group_role | NOT NULL, DEFAULT `'member'` | Role in group |
| `joined_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Join timestamp |

---

### `events`

Church events, Bible studies, services.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Event ID |
| `church_id` | UUID | NOT NULL, FK → `churches.id` ON DELETE CASCADE | Parent church |
| `creator_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Event creator |
| `title` | VARCHAR(255) | NOT NULL | Event title |
| `description` | TEXT | | Event description |
| `image_url` | VARCHAR(500) | | Event image URL |
| `type` | event_type | NOT NULL, DEFAULT `'service'` | Event type |
| `location` | VARCHAR(500) | | Event location |
| `start_date_time` | TIMESTAMP | NOT NULL | Start time |
| `end_date_time` | TIMESTAMP | | End time |
| `is_recurring` | BOOLEAN | DEFAULT `false` | Recurring flag |
| `recurrence_rule` | VARCHAR(255) | | iCal RRULE format |
| `max_attendees` | INTEGER | | Maximum attendees |
| `attendee_count` | INTEGER | DEFAULT `0` | Current attendee count |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### `event_attendees`

Event RSVP/attendance records.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Attendance ID |
| `event_id` | UUID | NOT NULL, FK → `events.id` ON DELETE CASCADE | Event |
| `user_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Attendee |
| `is_going` | BOOLEAN | DEFAULT `true` | RSVP status |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |

---

### `sermons`

Sermon archive with audio/video/notes.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Sermon ID |
| `church_id` | UUID | NOT NULL, FK → `churches.id` ON DELETE CASCADE | Parent church |
| `speaker_id` | UUID | FK → `users.id` | Speaker |
| `title` | VARCHAR(255) | NOT NULL | Sermon title |
| `description` | TEXT | | Sermon description |
| `scripture_ref` | VARCHAR(255) | | Scripture reference (e.g. "John 3:16") |
| `series_name` | VARCHAR(255) | | Series name |
| `audio_url` | VARCHAR(500) | | Audio file URL |
| `video_url` | VARCHAR(500) | | Video file URL |
| `notes_content` | TEXT | | Sermon notes (markdown) |
| `thumbnail_url` | VARCHAR(500) | | Thumbnail image URL |
| `duration_minutes` | INTEGER | | Duration in minutes |
| `sermon_date` | TIMESTAMP | NOT NULL | Date of sermon |
| `view_count` | INTEGER | DEFAULT `0` | Number of views |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### `prayer_requests`

Dedicated prayer request system.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Prayer request ID |
| `user_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Requester |
| `church_id` | UUID | FK → `churches.id` | Associated church |
| `title` | VARCHAR(255) | | Request title |
| `content` | TEXT | NOT NULL | Request content |
| `is_anonymous` | BOOLEAN | DEFAULT `false` | Anonymous flag |
| `is_urgent` | BOOLEAN | DEFAULT `false` | Urgent flag |
| `is_answered` | BOOLEAN | DEFAULT `false` | Answered flag |
| `prayer_count` | INTEGER | DEFAULT `0` | Number of prayers received |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### `prayer_supports`

Users who prayed for a request.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Support ID |
| `prayer_request_id` | UUID | NOT NULL, FK → `prayer_requests.id` ON DELETE CASCADE | Prayer request |
| `user_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Supporting user |
| `message` | TEXT | | Optional encouraging message |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |

---

### `notifications`

User notifications.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Notification ID |
| `user_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Recipient |
| `type` | notification_type | NOT NULL | Notification type |
| `title` | VARCHAR(255) | NOT NULL | Notification title |
| `message` | TEXT | | Notification message |
| `link_url` | VARCHAR(500) | | Deep link URL |
| `is_read` | BOOLEAN | DEFAULT `false` | Read status |
| `actor_id` | UUID | FK → `users.id` | User who triggered it |
| `post_id` | UUID | FK → `posts.id` | Related post |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |

---

### `saved_posts`

Bookmarked posts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Saved post ID |
| `user_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | User |
| `post_id` | UUID | NOT NULL, FK → `posts.id` ON DELETE CASCADE | Post |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |

---

### `hashtags`

Post hashtags.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Hashtag ID |
| `name` | VARCHAR(100) | NOT NULL, UNIQUE | Hashtag name |
| `post_count` | INTEGER | DEFAULT `0` | Number of posts using this tag |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |

---

### `post_hashtags`

Many-to-many join between posts and hashtags.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Join ID |
| `post_id` | UUID | NOT NULL, FK → `posts.id` ON DELETE CASCADE | Post |
| `hashtag_id` | UUID | NOT NULL, FK → `hashtags.id` ON DELETE CASCADE | Hashtag |

---

### `conversations`

Direct message conversations.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Conversation ID |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### `conversationParticipants`

Users in a conversation.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Participant ID |
| `conversation_id` | UUID | NOT NULL, FK → `conversations.id` ON DELETE CASCADE | Conversation |
| `user_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Participant |
| `last_read_at` | TIMESTAMP | | Last read timestamp |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |

---

### `messages`

Direct messages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Message ID |
| `conversation_id` | UUID | NOT NULL, FK → `conversations.id` ON DELETE CASCADE | Conversation |
| `sender_id` | UUID | NOT NULL, FK → `users.id` ON DELETE CASCADE | Sender |
| `content` | TEXT | NOT NULL | Message text |
| `image_url` | VARCHAR(500) | | Attached image URL |
| `is_read` | BOOLEAN | DEFAULT `false` | Read status |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |

---

## Entity Relationships

```
churches ──┬── users ──┬── posts ──── post_attachments
           │           │    │  ├── comments ──── reactions
           │           │    │  ├── reactions
           │           │    │  ├── post_hashtags ──── hashtags
           │           │    │  └── saved_posts
           │           ├── friends
           │           ├── messages
           │           ├── notifications
           │           ├── prayer_requests ──── prayer_supports
           │           └── sent_messages
           ├── groups ──── group_members
           ├── events ──── event_attendees
           ├── sermons
           └── prayer_requests

conversations ──── conversationParticipants
              └─── messages
```

### Key Relationships

- **Church → Users**: One church has many members
- **Church → Posts**: Posts can belong to a church
- **Church → Groups**: Groups belong to a church
- **Church → Events**: Events belong to a church
- **Church → Sermons**: Sermons belong to a church
- **User → Posts**: A user authors many posts
- **User → Comments**: A user authors many comments
- **User → Reactions**: A user has many reactions
- **User → Messages**: A user sends many direct messages
- **User → Notifications**: A user receives many notifications
- **User → Friends**: Users have friend connections (self-referencing via `user_id` and `friend_id`)
- **Post → Comments**: A post has many comments (with nested replies via `parent_id`)
- **Post → Reactions**: A post has many reactions
- **Post → Attachments**: A post has many attachments
- **Post → Hashtags**: Many-to-many via `post_hashtags`
- **Group → Members**: Groups have members with roles
- **Group → Posts**: Posts can belong to a group
- **Event → Attendees**: Events have attendee records
- **Prayer Request → Supports**: Prayer requests receive support messages
- **Conversation → Participants**: Conversations have participants
- **Conversation → Messages**: Conversations contain messages
