import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();

  // // Get user
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // // If there is no user, redirect any other pathname to "/login"
  // if (!user && req.nextUrl.pathname !== "/login") {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // // If there is a user , redirect "/login" to "/"
  // if (user && req.nextUrl.pathname === "/login") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return res;
}
