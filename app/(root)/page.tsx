import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import Header from "@/components/ui/header";
import HomeFeed from "@/components/feeds/home-feed";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Fetch current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  // Fetch profile
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);

  if (!profileData || profileData.length === 0) {
    notFound();
  }

  const profile = profileData[0];

  return (
    <>
      <Header>Home</Header>
      <HomeFeed profile={profile} />
    </>
  );
}
