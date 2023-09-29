import { type NextRequest, NextResponse } from "next/server";
import {
  editProfileValidator,
  EditProfileSchema,
} from "@/lib/validators/profile";
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
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 409 },
      );
    }

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error();
    }

    // Get profile and check if username is already taken
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", result.data.username)
      .neq("id", user.id);

    if (!data) {
      throw new Error();
    } else if (data.length > 0) {
      return NextResponse.json(
        { error: "The chosen username is already taken" },
        { status: 409 },
      );
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
      throw new Error();
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Profile could not be updated" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const formValues: { confirmUsername: string } = await request.json();
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
      throw new Error();
    }

    // Delete profile (via RPC call to database function with admin permissions)
    const { error } = await supabase.rpc("delete_user");

    if (error) {
      throw new Error();
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Account could not be deleted" },
      { status: 500 },
    );
  }
}
