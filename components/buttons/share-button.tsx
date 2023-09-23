"use client";

import { FiLink } from "react-icons/fi";

export default function ShareButton({
  handleCopyLink,
}: {
  handleCopyLink: () => void;
}) {
  return (
    <button
      onClick={handleCopyLink}
      className="rounded-full p-2 hover:bg-yellow-400/20 hover:text-yellow-400"
    >
      <FiLink size={18} />
    </button>
  );
}
