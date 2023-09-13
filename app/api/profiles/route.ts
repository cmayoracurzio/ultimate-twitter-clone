import { type NextRequest, NextResponse } from "next/server";
import { profileValidator, ProfileFormSchema } from "@/lib/validations/profile";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: NextRequest) {
  try {
    const formValues: ProfileFormSchema = await request.json();

    // Validate form schema on the server
    const result = profileValidator.safeParse(formValues);
    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }

    // Check if username is already taken
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", result.data.username);

    if (profilesError) {
      throw new Error("There was a problem with the server");
    } else if (profilesData.length > 0) {
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

    return NextResponse.json({ error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) });
  }
}
