import { z } from "zod";

export const profileValidator = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 50 characters long")
    .transform((username) => username.toLowerCase())
    .refine(
      (username) => /^[a-z0-9]+$/.test(username),
      "Username can only include letters and numbers"
    ),
  full_name: z
    .string()
    .trim()
    .min(3, "Display name must be at least 3 characters long")
    .max(50, "Display name must be at most 50 characters long"),
});

export type ProfileFormSchema = z.infer<typeof profileValidator>;
