"use client";

import { useProfile } from "@/components/providers/profile-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tweetValidator, type CreateTweetSchema } from "@/lib/validators/tweet";
import { useEffect, useRef } from "react";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function CreateTweetForm({
  replyToId = null,
  onFormSuccess,
}: {
  replyToId?: string | null;
  onFormSuccess: (newTweet: TweetwithMetadata) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setError,
  } = useForm<CreateTweetSchema>({
    resolver: zodResolver(tweetValidator),
  });
  const { username, avatar_url } = useProfile();
  const textAreaName = "text";
  const { ref, ...rest } = register(textAreaName);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const currentText = watch(textAreaName);

  function handleRef(element: HTMLTextAreaElement) {
    ref(element);
    textAreaRef.current = element;
  }

  useEffect(() => {
    const currentTextAreaRef = textAreaRef.current;
    if (currentTextAreaRef) {
      currentTextAreaRef.style.height = "auto";
      const maxHeight = Math.min(currentTextAreaRef.scrollHeight, 300);
      currentTextAreaRef.style.height = maxHeight + "px";
    }
  }, [textAreaRef, currentText]);

  async function onSubmit(newTweet: CreateTweetSchema) {
    const payload: any = {
      newTweet,
    };

    if (replyToId) {
      payload.replyToId = replyToId;
    }
    const response = await fetch(`${getBaseUrl()}/api/tweets`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const { error } = await response.json();
      setError(textAreaName, {
        message: error || "Something unexpected happened",
      });
    } else {
      const { data } = await response.json();
      if (data) {
        reset();
        onFormSuccess(data);
      }
    }
  }

  return (
    <article className="flex items-start gap-3 p-4">
      <Avatar src={avatar_url} alt={username} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-8"
      >
        <textarea
          {...rest}
          ref={handleRef}
          rows={1}
          placeholder={replyToId ? "Tweet your reply" : "What's happening?!"}
          className="mt-1.5 w-full resize-none border-none bg-transparent text-lg outline-none placeholder:text-gray-500"
        />
        <div className="flex items-center justify-between gap-1">
          <div className="text-md text-primary">
            {errors[textAreaName] && errors[textAreaName].message}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {replyToId ? "Reply" : "Tweet"}
          </Button>
        </div>
      </form>
    </article>
  );
}
