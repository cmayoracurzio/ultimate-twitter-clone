import { type NextRequest, NextResponse } from "next/server";
import { tweetValidator, CreateTweetSchema } from "@/lib/validators/tweet";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

// Post a new tweet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const formValues: CreateTweetSchema = body.newTweet;
    const replyToId: string | null = body?.replyToId;

    // Validate form schema on the server
    const result = tweetValidator.safeParse(formValues);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 409 },
      );
    }

    // Insert tweet in database and return inserted data
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data, error } = await supabase
      .from("tweets")
      .insert({ text: result.data.text, reply_to_id: replyToId })
      .select("*, author: profiles(*)");

    if (error) {
      throw new Error();
    }

    // Format the new tweet before returning it
    const newTweet: TweetwithMetadata = {
      ...data[0],
      author: Array.isArray(data[0].author)
        ? data[0].author[0]
        : data[0].author,
      replies: 0,
      likes: 0,
      createdByUser: true,
      likedByUser: false,
      bookmarkedByUser: false,
    };
    return NextResponse.json({ data: newTweet }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Tweet could not be posted" },
      { status: 500 },
    );
  }
}
