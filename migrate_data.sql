-- 1. User
INSERT INTO "user" (
  id, email, display_name, password_hash, role, avatar_url, banner_url, created_at, about_me, working_on, country, player_id, google_id, recent_games, roles
)
SELECT 
  id, email, "displayName", "passwordHash", role, "avatarUrl", "bannerUrl", "createdAt", "aboutMe", "workingOn", country, "playerId", "googleId", "recentGames", roles
FROM "User";

-- 2. Game
INSERT INTO game (
 id, banner_url, category, created_at, description, developer_link, developer_name, discord_url, download_url, embed_url, itch_url, plays, rating, steam_url, tags, thumbnail, title, twitter_url, video_url
) SELECT 
 id, "bannerUrl", category, "createdAt", description, "developerLink", "developerName", "discordUrl", "downloadUrl", "embedUrl", "itchUrl", plays, rating, "steamUrl", tags, thumbnail, title, "twitterUrl", "videoUrl"
FROM "Game";

-- 3. Session
INSERT INTO session (token, expires_at, user_id)
SELECT token, "expiresAt", "userId" FROM "Session";

-- 4. Vote
INSERT INTO vote (id, type, created_at, user_id, game_id)
SELECT id, type, "createdAt", "userId", "gameId" FROM "Vote";

-- 5. Conversation
INSERT INTO conversation (id, is_group, name, created_at)
SELECT id, "isGroup", name, "createdAt" FROM "Conversation";

-- 6. Participant
INSERT INTO participant (id, conversation_id, user_id, joined_at)
SELECT id, "conversationId", "userId", "joinedAt" FROM "Participant";

-- 7. Follow
INSERT INTO follow (id, follower_id, following_id, created_at)
SELECT id, "followerId", "followingId", "createdAt" FROM "Follow";

-- 8. Message
INSERT INTO message (id, conversation_id, sender_id, text, created_at)
SELECT id, "conversationId", "senderId", text, "createdAt" FROM "Message";

-- 9. _UserFavorites
INSERT INTO _user_favorites (a, b)
SELECT "A", "B" FROM "_UserFavorites";

-- 10. BrandInquiry
INSERT INTO brand_inquiry (id, name, email, company, budget, message, status, created_at)
SELECT id, name, email, company, budget, message, status, "createdAt" FROM "BrandInquiry";
