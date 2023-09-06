import OnboardingForm from "@/components/forms/OnboardingForm";
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
    <section className="w-full h-screen flex flex-col justify-center items-center p-8">
      <OnboardingForm profile={profileData?.[0] ?? null} />
    </section>
  );
}
