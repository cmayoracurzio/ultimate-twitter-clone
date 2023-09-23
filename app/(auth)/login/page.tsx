import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { BsTwitter } from "react-icons/bs";
import SignIn from "@/components/buttons/sign-in-button";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { GITHUB_REPO_URL } from "@/lib/constants";

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
      <h1 className="text-2xl font-bold sm:text-4xl">Ultimate Twitter Clone</h1>
      <div className="flex flex-col gap-4">
        <SignIn provider="google" label="Google">
          <FcGoogle size={24} />
        </SignIn>
        <SignIn provider="github" label="GitHub">
          <BsGithub size={24} />
        </SignIn>
      </div>
      <a
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-400 underline-offset-2 hover:text-gray-200"
      >
        See the code on GitHub
      </a>
    </div>
  );
}
