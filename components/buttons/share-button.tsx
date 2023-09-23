"use client";

import { getURL } from "@/lib/utils/getURL";
import { FiLink } from "react-icons/fi";

export default function ShareButton({ tweet }: { tweet: TweetwithMetadata }) {
  async function handleCopyLink() {
    const tweetUrl = `${getURL()}explore/${tweet.author.username}/${tweet.id}`;
    await navigator.clipboard.writeText(tweetUrl);
  }

  return (
    <button
      onClick={handleCopyLink}
      className="rounded-full p-2 hover:bg-yellow-400/20 hover:text-yellow-400"
    >
      <FiLink size={18} />
    </button>
  );
}
