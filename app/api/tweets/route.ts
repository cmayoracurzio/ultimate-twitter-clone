import { type NextRequest, NextResponse } from "next/server";
import { tweetValidator, TweetFormSchema } from "@/lib/validations/tweet";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// Get tweets
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const feedType = searchParams.get("feedType");
    const profileId = searchParams.get("profileId");

    const supabase = createRouteHandlerClient<Database>({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error();
    }

    let query;

    if (feedType === "bookmarks") {
      query = supabase
        .from("tweets")
        .select(
          "*, author: profiles(*), likes(profile_id), bookmarks!inner(*), replies(profile_id)"
        )
        .eq("bookmarks.profile_id", user.id);
    } else if (feedType === "profile" && profileId) {
      query = supabase
        .from("tweets")
        .select(
          "*, author: profiles(*), likes(profile_id), bookmarks(profile_id), replies(profile_id)"
        )
        .eq("profile_id", profileId);
    } else {
      query = supabase
        .from("tweets")
        .select(
          "*, author: profiles(*), likes(profile_id), bookmarks(profile_id), replies(profile_id)"
        );
    }

    // Sort by creation date and limit to 20 tweets
    query = query.order("created_at", { ascending: false }).limit(20);

    const { data } = await query;

    const tweets =
      data?.map((tweet) => ({
        ...tweet,
        author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
        replies: tweet.replies.length,
        likes: tweet.likes.length,
        likedByUser: tweet.likes.some((like) => like.profile_id === user.id),
        bookmarkedByUser: tweet.bookmarks.some(
          (bookmark) => bookmark.profile_id === user.id
        ),
      })) ?? [];

    return NextResponse.json(tweets);
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
  }
}

// Post a new tweet
export async function POST(request: NextRequest) {
  try {
    const formValues: TweetFormSchema = await request.json();

    // Validate form schema on the server
    const result = tweetValidator.safeParse(formValues);
    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }

    // Insert tweet in database and return inserted data
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data, error } = await supabase
      .from("tweets")
      .insert({ text: result.data.text })
      .select("*, author: profiles(*)");
    if (error) {
      throw new Error("Tweet could not be saved to database");
    }

    // Format the new tweet before returning it
    const newTweet: TweetwithMetadata = {
      ...data[0],
      author: Array.isArray(data[0].author)
        ? data[0].author[0]
        : data[0].author,
      replies: 0,
      likes: 0,
      likedByUser: false,
      bookmarkedByUser: false,
    };

    return NextResponse.json({ data: newTweet, error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: null, error: String(error) });
  }
}
