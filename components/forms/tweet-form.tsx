"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tweetValidator, type TweetFormSchema } from "@/lib/validations/tweet";
import { useEffect, useRef } from "react";
import { getURL } from "@/lib/utils/getURL";

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
  } = useForm<TweetFormSchema>({
    resolver: zodResolver(tweetValidator),
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

  const onSubmit = async (newTweet: TweetFormSchema) => {
    const response = await fetch(`${getURL()}/api/tweets`, {
      method: "POST",
      body: JSON.stringify(newTweet),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      setError(textAreaName, { message: "Something unexpected happened" });
    } else {
      const { data, error } = await response.json();
      if (error) {
        setError(textAreaName, { message: error });
      } else if (data) {
        addTweetToFeed(data);
        reset();
      }
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
          {errors[textAreaName] && errors[textAreaName].message}
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
