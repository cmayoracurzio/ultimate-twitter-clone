"use client";

import { FaFeatherAlt } from "react-icons/fa";

export default function TweetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-full bg-primary p-3 text-xl font-semibold hover:bg-opacity-70"
    >
      <p className="hidden xl:block">Tweet</p>
      <div className="block xl:hidden">
        <FaFeatherAlt size={24} />
      </div>
    </button>
  );
}
