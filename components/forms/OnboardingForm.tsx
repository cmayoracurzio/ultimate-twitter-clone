"use client";

import { useRouter } from "next/navigation";
import { type FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileFormSchema,
  type TProfileFormSchema,
} from "@/lib/types/form.types";
import { updateProfile } from "@/lib/actions";

export default function OnboardingForm({
  profile,
}: {
  profile: Profile | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: profile?.username ?? "",
      full_name: profile?.full_name ?? "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    try {
      const result = await updateProfile(data);
      if (!result.success) {
        setError("username", { message: result.error });
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setError("username", { message: "Something unexpected happened" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm flex flex-col gap-6"
    >
      <input
        {...register("username")}
        type="text"
        placeholder="Username"
        className="w-full h-12 px-6 rounded-full outline-none border border-gray-800 bg-gray-800 focus:border-primary placeholder:text-gray-500"
      />
      <input
        {...register("full_name")}
        type="text"
        placeholder="Display name"
        className="w-full h-12 px-6 rounded-full outline-none border border-gray-800 bg-gray-800 focus:border-primary placeholder:text-gray-500"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-full p-3 bg-primary text-xl font-semibold hover:bg-opacity-70"
      >
        Save
      </button>
      <div className="text-primary text-md">
        {errors.username?.message || errors.full_name?.message}
      </div>
    </form>
  );
}
