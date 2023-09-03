import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignIn from "@/components/SignIn";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}
