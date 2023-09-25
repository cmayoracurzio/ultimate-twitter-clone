"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editProfileValidator,
  type EditProfileSchema,
} from "@/lib/validations/profile";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import { Button } from "@/components/ui/button";

export default function EditProfile({
  username,
  fullName,
  onFormSuccess,
}: {
  username: string;
  fullName: string;
  onFormSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileValidator),
    defaultValues: { username, fullName },
  });

  const router = useRouter();

  async function onSubmit(formValues: EditProfileSchema) {
    const response = await fetch(`${getBaseUrl()}/api/profiles`, {
      method: "POST",
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
        router.push(`/explore/${formValues.username}`);
        onFormSuccess();
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-2 text-gray-50"
    >
      {/* Username input */}
      <div className="flex items-center gap-2 rounded-full px-5 py-2 ring-1 ring-inset ring-gray-600 focus-within:ring-primary">
        <input
          {...register("username")}
          type="text"
          className="peer order-last w-full bg-transparent outline-none placeholder:text-gray-400"
        />
        <label
          htmlFor="username"
          className="whitespace-nowrap text-sm text-gray-600 peer-focus-within:text-primary "
        >
          Username:
        </label>
      </div>

      {/* Full name input */}
      <div className="flex items-center gap-2 rounded-full px-5 py-2 ring-1 ring-inset ring-gray-600 focus-within:ring-primary">
        <input
          {...register("fullName")}
          type="text"
          className="peer order-last w-full bg-transparent outline-none placeholder:text-gray-400"
        />
        <label
          htmlFor="fullName"
          className="whitespace-nowrap text-sm text-gray-600 peer-focus-within:text-primary"
        >
          Full name:
        </label>
      </div>

      {/* Form submit button */}
      <Button type="submit" disabled={isSubmitting} width="full">
        Save changes
      </Button>

      {/* Error messages */}
      <div className="h-8 text-primary">
        {errors.username?.message || errors.fullName?.message}
      </div>
    </form>
  );
}
