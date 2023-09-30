import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { BsTwitter } from "react-icons/bs";
import SignIn from "@/components/buttons/sign-in";
import { GITHUB_REPO_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 p-4 text-center">
      <div className="text-primary">
        <BsTwitter size={64} />
      </div>
      <h1 className="text-3xl font-bold sm:text-4xl">Ultimate Twitter Clone</h1>
      <SignIn />
      <a
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300"
      >
        See the code on GitHub
      </a>
    </div>
  );
}
