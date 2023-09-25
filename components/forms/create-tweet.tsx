"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tweetValidator, type TweetFormSchema } from "@/lib/validations/tweet";
import { useEffect, useRef } from "react";
import { useProfile } from "@/components/providers/profile-provider";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import { cn } from "@/lib/utils/cn";
import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function CreateTweet({
  replyToId = null,
  className,
  onFormSuccess,
}: {
  replyToId?: string | null;
  className?: string;
  onFormSuccess: (newTweet: TweetwithMetadata) => void;
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
  const { avatar_url } = useProfile();

  async function handleRef(element: HTMLTextAreaElement) {
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

  async function onSubmit(newTweet: TweetFormSchema) {
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
      setError(textAreaName, { message: "Something unexpected happened" });
    } else {
      const { data, error } = await response.json();
      if (error) {
        setError(textAreaName, { message: error });
      } else if (data) {
        reset();
        onFormSuccess(data);
      }
    }
  }

  return (
    <Card className={cn("flex items-start gap-3", className)}>
      <Avatar src={avatar_url} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-8 text-gray-50"
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
          <div className="w-fit">
            <Button type="submit" disabled={isSubmitting}>
              {replyToId ? "Reply" : "Tweet"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
