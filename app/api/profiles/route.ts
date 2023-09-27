import { type NextRequest, NextResponse } from "next/server";
import {
  editProfileValidator,
  EditProfileSchema,
} from "@/lib/validations/edit-profile";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formValues: EditProfileSchema = await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Validate form schema on the server
    const result = editProfileValidator.safeParse(formValues);
    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Profile could not be updated" });
    }

    // Get profile and check if username is already taken
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", result.data.username)
      .neq("id", user.id);
    if (!data) {
      return NextResponse.json({ error: "Profile could not be updated" });
    } else if (data.length > 0) {
      return NextResponse.json({
        error: "The chosen username is already taken",
      });
    }

    // Update profile in database
    const { error } = await supabase
      .from("profiles")
      .update({
        username: result.data.username,
        full_name: result.data.fullName,
      })
      .eq("id", user.id);
    if (error) {
      return NextResponse.json({ error: "Profile could not be updated" });
    }

    return NextResponse.json({ error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something unexpected happened" });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const formValues: {
      confirmUsername: string;
    } = await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Get profile for confirmUsername
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", formValues.confirmUsername);

    // Compare current user id and profile id
    if (!user || !data || data[0].id !== user.id) {
      return NextResponse.json({ error: "Account could not be deleted" });
    }

    // Delete profile (via RPC call to database function that handles this)
    // In a more complex application we might want to schedule deletion instead,
    // log deletion event, save anonymized data as backup, etc.
    const { error } = await supabase.rpc("delete_user");
    if (error) {
      return NextResponse.json({ error: "Account could not be deleted" });
    }

    return NextResponse.json({ error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something unexpected happened" });
  }
}
