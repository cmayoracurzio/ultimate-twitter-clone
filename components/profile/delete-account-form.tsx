"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { DeleteAccountSchema } from "@/lib/validations/profile";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getURL } from "@/lib/utils/getURL";

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
          className="peer order-last w-full bg-transparent text-white outline-none placeholder:text-gray-400"
        />
        <label
          htmlFor="username"
          className="whitespace-nowrap text-sm text-gray-600 peer-focus-within:text-primary"
        >
          Confirm username:
        </label>
      </div>

      {/* Form submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-red-500 px-5 py-2 text-center font-semibold text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      >
        Delete account
      </button>

      {/* Error messages */}
      <div className="h-8 text-primary">{errors.username?.message}</div>
    </form>
  );
}
