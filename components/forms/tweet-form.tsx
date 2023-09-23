"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tweetValidator, type TweetFormSchema } from "@/lib/validations/tweet";
import { useEffect, useRef } from "react";
import { getURL } from "@/lib/utils/getURL";

export default function TweetForm({
  replyToId = null,
  addTweetToFeed,
}: {
  replyToId?: string | null;
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

  async function handleRef(element: HTMLTextAreaElement) {
    ref(element);
    textAreaRef.current = element;
  }

  useEffect(() => {
    const currentTextAreaRef = textAreaRef.current;
    if (currentTextAreaRef) {
      currentTextAreaRef.style.height = "auto";
      currentTextAreaRef.style.height = currentTextAreaRef.scrollHeight + "px";
    }
  }, [textAreaRef, currentText]);

  async function onSubmit(newTweet: TweetFormSchema) {
    const payload: any = {
      newTweet,
    };

    if (replyToId) {
      payload.replyToId = replyToId;
    }
    const response = await fetch(`${getURL()}/api/tweets`, {
      method: "POST",
      body: JSON.stringify(payload),
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
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-8"
    >
      <textarea
        {...rest}
        ref={handleRef}
        rows={1}
        placeholder={replyToId ? "Tweet your reply" : "What's happening?!"}
        className="mt-1.5 w-full resize-none border-none bg-transparent text-lg outline-none"
      />
      <div className="flex items-center justify-between gap-1">
        <div className="text-md text-primary">
          {errors[textAreaName] && errors[textAreaName].message}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-primary px-5 py-2 text-center font-semibold hover:bg-opacity-70"
        >
          {replyToId ? "Reply" : "Tweet"}
        </button>
      </div>
    </form>
  );
}
