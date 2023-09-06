import { z } from "zod";

export const tweetFormSchema = z.object({
  text: z
    .string()
    .trim()
    .max(3000)
    .refine((text: string) => text.replaceAll("\n", "").length > 0, {
      message: "Tweet cannot be empty",
    }),
});

export type TTweetFormSchema = z.infer<typeof tweetFormSchema>;

export const profileFormSchema = z.object({
  username: z.string().min(3).max(50),
  full_name: z.string().min(3).max(50),
});

export type TProfileFormSchema = z.infer<typeof profileFormSchema>;
