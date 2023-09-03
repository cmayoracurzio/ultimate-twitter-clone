"use client";

import { BsThreeDots } from "react-icons/bs";

export default function TweetOptionsButton() {
  return (
    <button className="hover:bg-primary/20 hover:text-primary rounded-full p-2">
      <BsThreeDots size={18} />
    </button>
  );
}
