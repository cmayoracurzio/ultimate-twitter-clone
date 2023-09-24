import { type NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log(`code: ${code}`);
  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log(`data: ${data}`);
    console.log(`error: ${error}`);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
