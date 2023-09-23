"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BackButton() {
  const router = useRouter();

  async function handleClick() {
    router.back();
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-full p-2 hover:bg-gray-800"
    >
      <FiArrowLeft />
    </button>
  );
}
