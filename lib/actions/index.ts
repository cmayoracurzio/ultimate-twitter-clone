"use server";

import { FieldValues } from "react-hook-form";
import { tweetFormSchema, profileFormSchema } from "@/lib/types/form.types";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type ServerActionResponse = {
  success: boolean;
  error?: string;
};

type CreateTweetResponse = ServerActionResponse & {
  data?: TweetwithMetadata;
};

export async function createTweet(
  formValues: FieldValues
): Promise<CreateTweetResponse> {
  try {
    // Validate form schema on the server
    const result = tweetFormSchema.safeParse(formValues);
    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }

    // Insert tweet in database and return inserted data
    const supabase = createServerActionClient<Database>({ cookies });
    const { data, error } = await supabase
      .from("tweets")
      .insert({ text: result.data.text })
      .select("*, author: profiles(*)");
    if (error) {
      throw new Error("Tweet could not be saved to database");
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
  } catch (error) {
    console.error(error);
    return { success: false, error: String(error) };
  }
}

export async function updateProfile(
  formValues: FieldValues
): Promise<ServerActionResponse> {
  try {
    // Validate form schema on the server
    const result = profileFormSchema.safeParse(formValues);
    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }

    // Check if username is already taken
    const supabase = createServerActionClient<Database>({ cookies });
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("username");
    if (profilesError) {
      throw new Error("There was a problem with the server");
    }

    const isUsernameTaken = profilesData
      .map((usernameObject) => usernameObject.username)
      .includes(result.data.username);
    if (isUsernameTaken) {
      throw new Error("The chosen username is already taken");
    }

    // Get user id to update the right profile
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("Profile could not be saved to database");
    }

    // Update profile in database
    const { error } = await supabase
      .from("profiles")
      .update({
        username: result.data.username,
        full_name: result.data.full_name,
      })
      .eq("id", user.id);
    if (error) {
      throw new Error("Profile could not be saved to database");
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: String(error) };
  }

  return { success: true };
}
