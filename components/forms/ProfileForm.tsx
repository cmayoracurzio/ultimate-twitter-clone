"use client";

import { useRouter } from "next/navigation";
import { type FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileValidator,
  type ProfileFormSchema,
} from "@/lib/validations/profile";
import { updateProfile } from "@/lib/actions";
import { PiSpinnerBold } from "react-icons/pi";

export default function ProfileForm({ profile }: { profile: Profile | null }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileValidator),
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
