"use client";

import { BsThreeDots } from "react-icons/bs";

export default function OptionsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
    >
      <BsThreeDots size={18} />
    </button>
  );
}
