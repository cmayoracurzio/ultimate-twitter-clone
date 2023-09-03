import type { Database as DB } from "@/lib/types/database.types";

declare global {
  type Database = DB;
  type Tweet = DB["public"]["Tables"]["tweets"]["Row"];
  type Profile = DB["public"]["Tables"]["profiles"]["Row"];
  type Like = DB["public"]["Tables"]["likes"]["Row"];
  type Bookmark = DB["public"]["Tables"]["bookmarks"]["Row"];
  type TweetwithMetadata = Tweet & {
    author: Profile;
    replies: number;
    likes: number;
    likedByUser: boolean;
    bookmarkedByUser: boolean;
  };
}
