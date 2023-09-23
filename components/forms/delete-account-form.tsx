"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { DeleteAccountSchema } from "@/lib/validations/profile";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getURL } from "@/lib/utils/getURL";
import BaseButton from "@/components/buttons/text-button";

export default function AccountForm({ username }: { username: string }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DeleteAccountSchema>();

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  async function onSubmit(formValues: DeleteAccountSchema) {
    const response = await fetch(`${getURL()}/api/profiles`, {
      method: "DELETE",
      body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      setError("username", { message: "Something unexpected happened" });
    } else {
      const { error } = await response.json();
      if (error) {
        setError("username", { message: error });
      } else {
        await supabase.auth.signOut();
        router.push("/login");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-2"
    >
      {/* Confirm username input */}
      <div className="flex items-center gap-2 rounded-full px-5 py-2 ring-1 ring-inset ring-gray-600 focus-within:ring-primary">
        <input
          {...register("username", {
            validate: (fieldValue: string) => {
              return (
                fieldValue === username ||
                "Error: Username confirmation is incorrect"
              );
            },
          })}
          type="text"
          className="peer order-last w-full bg-transparent outline-none placeholder:text-gray-400"
        />
        <label
          htmlFor="username"
          className="whitespace-nowrap text-sm text-gray-600 peer-focus-within:text-primary"
        >
          Confirm username:
        </label>
      </div>

      {/* Form submit button */}
      <BaseButton type="submit" disabled={isSubmitting} variant="destructive">
        Delete account
      </BaseButton>

      {/* Error messages */}
      <div className="h-8 text-primary">{errors.username?.message}</div>
    </form>
  );
}
