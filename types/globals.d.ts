import type { Database as DB } from "@/types/database.types";

type TableRow<T> = T["public"]["Tables"];

declare global {
  type Database = DB;
  type Tweet = TableRow<DB>["tweets"]["Row"];
  type Profile = TableRow<DB>["profiles"]["Row"];
  type Like = TableRow<DB>["likes"]["Row"];
  type Bookmark = TableRow<DB>["bookmarks"]["Row"];

  type TweetwithMetadata = Tweet & {
    author: Profile;
    replies: number;
    likes: number;
    likedByUser: boolean;
    bookmarkedByUser: boolean;
  };

  type ProfileWithMetadata = Profile & {
    stats: {
      name: string;
      count: number;
    }[];
  };
}
