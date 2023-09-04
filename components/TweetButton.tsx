"use client";

import { FaFeatherAlt } from "react-icons/fa";

export default function TweetButton() {
  return (
    <button className="w-fit xl:w-full rounded-full p-3 bg-primary text-xl font-semibold hover:bg-opacity-70">
      <p className="hidden xl:block">Tweet</p>
      <div className="block xl:hidden">
        <FaFeatherAlt size={24} />
      </div>
    </button>
  );
}
