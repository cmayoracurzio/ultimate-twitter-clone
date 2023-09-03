"use server";

import { FieldValues } from "react-hook-form";
import { formSchema } from "@/lib/types/form.types";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type CreateTweetResponse = {
  success: boolean;
  error?: string; // Optional error message
  data?: TweetwithMetadata; // Optional TweetwithMetadata data
};

export async function createTweet(
  formValues: FieldValues
): Promise<CreateTweetResponse> {
  // Validate form schema on the server
  const result = formSchema.safeParse(formValues);
  if (!result.success) {
    console.error(result.error);
    return { success: false, error: result.error.issues[0].message };
  }

  // Insert tweet in database and return inserted data
  const supabase = createServerActionClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("tweets")
    .insert({ text: result.data.text })
    .select("*, author: profiles(*)");
  if (error) {
    console.error(error);
    return { success: false, error: "Tweet was not saved to database" };
  }

  return {
    success: true,
    data: {
      ...data[0],
      author: Array.isArray(data[0].author)
        ? data[0].author[0]
        : data[0].author,
      replies: 0,
      likes: 0,
      likedByUser: false,
      bookmarkedByUser: false,
    },
  };
}
