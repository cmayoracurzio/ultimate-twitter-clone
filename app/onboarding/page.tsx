import ProfileForm from "@/components/forms/ProfileForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Protect route from unauthenticated users
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile information
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);

  if (profileData?.[0].username) {
    redirect("/");
  }

  return (
    <main className="w-full h-screen flex justify-center items-center p-6">
      <div className="max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Welcome, {user.email}!</h1>
        <p className="mb-2">
          Complete your profile information below to start using the Ultimate
          Twitter Clone.
        </p>
        <ProfileForm profile={profileData?.[0] ?? null} />
      </div>
    </main>
  );
}
