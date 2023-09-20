"use client";

import { FaFeatherAlt } from "react-icons/fa";

export default function TweetButton() {
  return (
    <button className="w-fit rounded-full bg-primary p-3 text-xl font-semibold hover:bg-opacity-70 xl:w-full">
      <p className="hidden xl:block">Tweet</p>
      <div className="block xl:hidden">
        <FaFeatherAlt size={24} />
      </div>
    </button>
  );
}
