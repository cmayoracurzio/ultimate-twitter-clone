"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileValidator,
  type ProfileFormSchema,
} from "@/lib/validations/profile";
import { PiSpinnerBold } from "react-icons/pi";
import { getURL } from "@/lib/utils/getURL";

export default function ProfileForm({
  currentUserProfile,
}: {
  currentUserProfile: Profile | null;
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
        router.push("/");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <input
          {...register("username")}
          type="text"
          className="order-last h-12 px-6 rounded-full outline-none border border-gray-800 bg-gray-800 peer focus:border-primary placeholder:text-gray-500"
        />
        <label
          htmlFor="username"
          className="pl-2 text-gray-500 peer-focus:text-white"
        >
          Username
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <input
          {...register("full_name")}
          type="text"
          className="order-last h-12 px-6 rounded-full outline-none border border-gray-800 bg-gray-800 peer focus:border-primary placeholder:text-gray-500"
        />
        <label
          htmlFor="full_name"
          className="pl-2 text-gray-500 peer-focus:text-white"
        >
          Display name
        </label>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || isSubmitSuccessful}
        className="mt-6 h-12 flex justify-center items-center rounded-full p-3 bg-primary text-xl font-semibold hover:bg-opacity-70 disabled:bg-opacity-70"
      >
        {isSubmitting || isSubmitSuccessful ? (
          <div className="animate-spin">
            <PiSpinnerBold />
          </div>
        ) : (
          "Save"
        )}
      </button>
      <div className="mt-4 h-20 text-primary text-md">
        {errors.username?.message || errors.full_name?.message}
      </div>
    </form>
  );
}
