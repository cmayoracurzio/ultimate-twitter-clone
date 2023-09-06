import type { Database as DB } from "@/types/database.types";

type Tweet = DB["public"]["Tables"]["tweets"]["Row"];
type Profile = DB["public"]["Tables"]["profiles"]["Row"];
type Like = DB["public"]["Tables"]["likes"]["Row"];
type Bookmark = DB["public"]["Tables"]["bookmarks"]["Row"];

declare global {
  type Database = DB;
  type Profile = Profile;
  type Like = Like;
  type Bookmark = Bookmark;
  type TweetwithMetadata = Tweet & {
    author: Profile;
    replies: number;
    likes: number;
    likedByUser: boolean;
    bookmarkedByUser: boolean;
  };
}
