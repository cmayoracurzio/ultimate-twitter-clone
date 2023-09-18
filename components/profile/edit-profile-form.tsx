"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileValidator,
  type ProfileFormSchema,
} from "@/lib/validations/profile";
import { getURL } from "@/lib/utils/getURL";

export default function EditProfileForm({
  currentUserProfile,
}: {
  currentUserProfile: Profile;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileValidator),
    defaultValues: {
      username: currentUserProfile?.username ?? "",
      full_name: currentUserProfile?.full_name ?? "",
    },
  });

  const router = useRouter();

  const onSubmit = async (updatedProfile: ProfileFormSchema) => {
    const response = await fetch(`${getURL()}/api/profiles`, {
      method: "POST",
      body: JSON.stringify(updatedProfile),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      setError("username", { message: "Something unexpected happened" });
    } else {
      const { error } = await response.json();
      if (error) {
        setError("username", { message: error });
      } else {
        router.push(`/profiles/${updatedProfile.username}`);
        router.refresh();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      {/* Username input */}
      <div className="flex items-center gap-2 rounded-full px-5 py-2 ring-1 ring-inset ring-gray-600 focus-within:ring-primary">
        <input
          {...register("username")}
          type="text"
          className="outline-none bg-transparent w-full text-white placeholder:text-gray-400 peer order-last"
        />
        <label
          htmlFor="username"
          className="w-24 text-sm text-gray-600 peer-focus-within:text-primary"
        >
          Username:
        </label>
      </div>

      {/* Full name input */}
      <div className="flex items-center gap-2 rounded-full px-5 py-2 ring-1 ring-inset ring-gray-600 focus-within:ring-primary">
        <input
          {...register("full_name")}
          type="text"
          className="outline-none bg-transparent w-full text-white placeholder:text-gray-400 peer order-last"
        />
        <label
          htmlFor="full_name"
          className="w-24 text-sm text-gray-600 peer-focus-within:text-primary"
        >
          Full name:
        </label>
      </div>

      {/* Form submit button */}
      <button
        type="submit"
        disabled={isSubmitting || isSubmitSuccessful}
        className="w-full text-center rounded-full bg-primary px-5 py-2 font-semibold text-white hover:bg-opacity-70 disabled:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Save changes
      </button>

      {/* Error messages */}
      <div className="h-8 text-primary">
        {errors.username?.message || errors.full_name?.message}
      </div>
    </form>
  );
}
