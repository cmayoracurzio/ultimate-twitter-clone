import { z } from "zod";

export const formSchema = z.object({
  text: z
    .string()
    .trim()
    .max(3000)
    .refine((text: string) => text.replaceAll("\n", "").length > 0, {
      message: "Tweet cannot be empty",
    }),
});

export type TFormSchema = z.infer<typeof formSchema>;
