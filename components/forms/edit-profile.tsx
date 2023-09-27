"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editProfileValidator,
  type EditProfileSchema,
} from "@/lib/validations/edit-profile";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  const router = useRouter();
  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileValidator),
    defaultValues: { username, fullName },
  });

  async function onSubmit(formValues: EditProfileSchema) {
    const response = await fetch(`${getBaseUrl()}/api/profiles`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      form.setError("username", { message: "Something unexpected happened" });
    } else {
      const { error } = await response.json();
      if (error) {
        form.setError("username", { message: error });
      } else {
        router.push(`/explore/${formValues.username}`);
        onFormSuccess();
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-gray-50"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder={username} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder={fullName} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          variant="default"
          width="full"
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
}
