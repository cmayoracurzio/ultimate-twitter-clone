import { type NextRequest, NextResponse } from "next/server";
import {
  editProfileValidator,
  EditProfileSchema,
  DeleteAccountSchema,
} from "@/lib/validations/profile";
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
      throw new Error("Profile could not be updated");
    }

    // Get profile and check if username is already taken
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", result.data.username)
      .neq("id", user.id);
    if (!data) {
      throw new Error("Profile could not be updated");
    } else if (data.length > 0) {
      throw new Error("The chosen username is already taken");
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
      throw new Error("Profile could not be updated");
    }

    return NextResponse.json({ error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const formValues: DeleteAccountSchema = await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Get profile for the username
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", formValues.username);

    // Compare current user id and profile id
    if (!user || !data || data[0].id !== user.id) {
      throw new Error("Account could not be deleted");
    }

    // Delete profile (via RPC call to database function that handles this)
    // In a more complex application we might want to schedule deletion instead,
    // log deletion event, save anonymized data as backup, etc.
    const { error } = await supabase.rpc("delete_user");
    if (error) {
      throw new Error("Account could not be deleted");
    }

    return NextResponse.json({ error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) });
  }
}
