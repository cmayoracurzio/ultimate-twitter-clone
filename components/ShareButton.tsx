"use client";

import { getURL } from "@/lib/utils/getURL";
import { FiLink } from "react-icons/fi";

export default function ShareButton({ tweet }: { tweet: TweetwithMetadata }) {
  const handleCopyLink = async () => {
    const tweetUrl = `${getURL()}tweets/${tweet.id}`;
    await navigator.clipboard.writeText(tweetUrl);
  };

  return (
    <button
      onClick={handleCopyLink}
      className="hover:bg-primary/20 hover:text-primary rounded-full p-2"
    >
      <FiLink size={18} />
    </button>
  );
}
