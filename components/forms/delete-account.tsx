"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
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

export default function DeleteAccount({
  username,
  onFormSuccess,
}: {
  username: string;
  onFormSuccess: () => void;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  // Validation schema depends on username prop
  const deleteAccountValidator = z.object({
    confirmUsername: z
      .string({ required_error: "Username confirmation is incorrect" })
      .refine((data) => data === username, {
        message: "Username confirmation is incorrect",
      }),
  });

  type DeleteAccountSchema = z.infer<typeof deleteAccountValidator>;

  const form = useForm<DeleteAccountSchema>({
    resolver: zodResolver(deleteAccountValidator),
  });

  async function onSubmit(formValues: DeleteAccountSchema) {
    const response = await fetch(`${getBaseUrl()}/api/profiles`, {
      method: "DELETE",
      body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      form.setError("confirmUsername", {
        message: "Something unexpected happened",
      });
    } else {
      const { error } = await response.json();
      if (error) {
        form.setError("confirmUsername", { message: error });
      } else {
        await supabase.auth.signOut();
        router.push("/login");
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
          name="confirmUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm your username</FormLabel>
              <FormControl>
                <Input placeholder={username} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          variant="destructive"
          width="full"
        >
          Delete account
        </Button>
      </form>
    </Form>
  );
}
