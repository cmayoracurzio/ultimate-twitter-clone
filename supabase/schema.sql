
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."delete_user"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
    DELETE FROM auth.users
    WHERE auth.users.id = auth.uid();
END;$$;

ALTER FUNCTION "public"."delete_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$DECLARE
    base_username TEXT;
    temp_username TEXT;
    counter INT := 1;
BEGIN

  -- Get base username from email before the '@' and keep only alphanumeric characters
  base_username := REGEXP_REPLACE(split_part(new.email, '@', 1), '[^a-zA-Z0-9]', '', 'g');

  -- Initialize with base username
  temp_username := base_username;

  -- Loop to find a unique username
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = temp_username) LOOP
    temp_username := base_username || counter::TEXT;
    counter := counter + 1;
  END LOOP;

  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    temp_username,
    COALESCE(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      new.raw_user_meta_data->>'preferred_username',
      temp_username
    ),
    COALESCE(new.raw_user_meta_data->>'avatar_url', NULL)
  );
  
  return new;
END;$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$begin
  new.updated_at = CURRENT_TIMESTAMP;
  return new;
end;$$;

ALTER FUNCTION "public"."handle_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."bookmarks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "tweet_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL
);

ALTER TABLE "public"."bookmarks" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."followers" (
    "follower_id" "uuid" NOT NULL,
    "following_id" "uuid" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL
);

ALTER TABLE "public"."followers" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."hashtags" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."hashtags" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."likes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "tweet_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);

ALTER TABLE "public"."likes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "username" "text" NOT NULL,
    "full_name" "text" NOT NULL,
    "avatar_url" "text",
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."tweet_hashtag" (
    "tweet_id" "uuid" NOT NULL,
    "hashtag_id" "uuid" NOT NULL
);

ALTER TABLE "public"."tweet_hashtag" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."tweets" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "text" "text" NOT NULL,
    "profile_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "reply_to_id" "uuid"
);

ALTER TABLE "public"."tweets" OWNER TO "postgres";

ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmark_unique" UNIQUE ("profile_id", "tweet_id");

ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "followers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."hashtags"
    ADD CONSTRAINT "hashtags_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "like_unique" UNIQUE ("profile_id", "tweet_id");

ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");

ALTER TABLE ONLY "public"."tweet_hashtag"
    ADD CONSTRAINT "tweet_hashtag_pkey" PRIMARY KEY ("tweet_id", "hashtag_id");

ALTER TABLE ONLY "public"."tweets"
    ADD CONSTRAINT "tweets_pkey" PRIMARY KEY ("id");

CREATE TRIGGER "on_profile_update" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();

ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "public"."tweets"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "followers_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "followers_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "public"."tweets"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."tweet_hashtag"
    ADD CONSTRAINT "tweet_hashtag_hashtag_id_fkey" FOREIGN KEY ("hashtag_id") REFERENCES "public"."hashtags"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."tweet_hashtag"
    ADD CONSTRAINT "tweet_hashtag_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "public"."tweets"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."tweets"
    ADD CONSTRAINT "tweets_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."tweets"
    ADD CONSTRAINT "tweets_reply_to_id_fkey" FOREIGN KEY ("reply_to_id") REFERENCES "public"."tweets"("id") ON DELETE CASCADE;

CREATE POLICY "Authenticated users can delete their own bookmarks" ON "public"."bookmarks" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "profile_id"));

CREATE POLICY "Authenticated users can delete their own likes" ON "public"."likes" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "profile_id"));

CREATE POLICY "Authenticated users can delete their own profile" ON "public"."profiles" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "id"));

CREATE POLICY "Authenticated users can delete their own tweets" ON "public"."tweets" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "profile_id"));

CREATE POLICY "Authenticated users can insert their own bookmarks" ON "public"."bookmarks" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "profile_id"));

CREATE POLICY "Authenticated users can insert their own follows" ON "public"."followers" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "follower_id"));

CREATE POLICY "Authenticated users can insert their own likes" ON "public"."likes" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "profile_id"));

CREATE POLICY "Authenticated users can insert their own profile" ON "public"."profiles" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "Authenticated users can insert their own tweets" ON "public"."tweets" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "profile_id"));

CREATE POLICY "Authenticated users can remove their own follows" ON "public"."followers" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "follower_id"));

CREATE POLICY "Authenticated users can see all follows" ON "public"."followers" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Authenticated users can see all likes" ON "public"."likes" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Authenticated users can see all profiles" ON "public"."profiles" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Authenticated users can see all tweets" ON "public"."tweets" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Authenticated users can see their own bookmarks" ON "public"."bookmarks" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "profile_id"));

CREATE POLICY "Authenticated users can update their own profile" ON "public"."profiles" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "id"));

ALTER TABLE "public"."bookmarks" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."followers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."hashtags" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."likes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."tweet_hashtag" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."tweets" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."delete_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "service_role";

GRANT ALL ON TABLE "public"."bookmarks" TO "anon";
GRANT ALL ON TABLE "public"."bookmarks" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmarks" TO "service_role";

GRANT ALL ON TABLE "public"."followers" TO "anon";
GRANT ALL ON TABLE "public"."followers" TO "authenticated";
GRANT ALL ON TABLE "public"."followers" TO "service_role";

GRANT ALL ON TABLE "public"."hashtags" TO "anon";
GRANT ALL ON TABLE "public"."hashtags" TO "authenticated";
GRANT ALL ON TABLE "public"."hashtags" TO "service_role";

GRANT ALL ON TABLE "public"."likes" TO "anon";
GRANT ALL ON TABLE "public"."likes" TO "authenticated";
GRANT ALL ON TABLE "public"."likes" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."tweet_hashtag" TO "anon";
GRANT ALL ON TABLE "public"."tweet_hashtag" TO "authenticated";
GRANT ALL ON TABLE "public"."tweet_hashtag" TO "service_role";

GRANT ALL ON TABLE "public"."tweets" TO "anon";
GRANT ALL ON TABLE "public"."tweets" TO "authenticated";
GRANT ALL ON TABLE "public"."tweets" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
