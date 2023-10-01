"use client";

import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Follow({
  profileId,
  followedByUser,
}: {
  profileId: string;
  followedByUser: boolean;
}) {
  const [isFollowed, setIsFollowed] = useState(followedByUser);
  const [isHovered, setIsHovered] = useState(false);
  const supabase = createClientComponentClient<Database>();

  async function handleFollow() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Update state optimistically
      startTransition(() => {
        setIsFollowed(!isFollowed);
        setIsHovered(false);
      });
      if (isFollowed) {
        await supabase
          .from("followers")
          .delete()
          .match({ follower_id: user.id, following_id: profileId });
      } else {
        await supabase
          .from("followers")
          .insert({ follower_id: user.id, following_id: profileId });
      }
    }
  }

  return (
    <Button
      variant={isFollowed ? (isHovered ? "red" : "ghost") : "default"}
      border="default"
      size="icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleFollow}
      className="w-24"
    >
      {isFollowed ? (isHovered ? "Unfollow" : "Following") : "Follow"}
    </Button>
  );
}
