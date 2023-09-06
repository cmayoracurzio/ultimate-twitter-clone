"use client";

import { type FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tweetFormSchema, type TTweetFormSchema } from "@/lib/types/form.types";
import { createTweet } from "@/lib/actions";
import { useEffect, useRef } from "react";

export default function TweetForm({
  addTweetToFeed,
}: {
  addTweetToFeed: (newTweet: TweetwithMetadata) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setError,
  } = useForm<TTweetFormSchema>({
    resolver: zodResolver(tweetFormSchema),
  });
  const textAreaName = "text";
  const { ref, ...rest } = register(textAreaName);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const currentText = watch(textAreaName);

  const handleRef = async (element: HTMLTextAreaElement) => {
    ref(element);
    textAreaRef.current = element;
  };

  useEffect(() => {
    const currentTextAreaRef = textAreaRef.current;
    if (currentTextAreaRef) {
      currentTextAreaRef.style.height = "auto";
      currentTextAreaRef.style.height = currentTextAreaRef.scrollHeight + "px";
    }
  }, [textAreaRef, currentText]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const result = await createTweet(data);
      if (!result.success) {
        setError(textAreaName, { message: result.error });
      } else if (result.data) {
        addTweetToFeed(result.data);
        reset();
      }
    } catch (error) {
      console.error(error);
      setError(textAreaName, {
        message: "Something unexpected happened",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-8"
    >
      <textarea
        {...rest}
        ref={handleRef}
        rows={1}
        placeholder="What's happening?!"
        className="w-full resize-none mt-1.5 outline-none border-none bg-transparent text-lg"
      />
      <div className="flex items-center justify-between gap-1">
        <div className="text-primary text-md">
          {errors[textAreaName] && `${errors[textAreaName].message}`}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full py-2 px-5 bg-primary font-semibold text-center hover:bg-opacity-70"
        >
          Tweet
        </button>
      </div>
    </form>
  );
}
