import { z } from "zod";

export const editProfileValidator = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 50 characters long")
    .transform((username) => username.toLowerCase())
    .refine(
      (username) => /^[a-z0-9]+$/.test(username),
      "Username can only include letters and numbers",
    ),
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name must be at most 50 characters long"),
});

export type EditProfileSchema = z.infer<typeof editProfileValidator>;
