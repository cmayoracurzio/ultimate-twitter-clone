"use client";

import { ButtonHTMLAttributes } from "react";

import { BiRefresh } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import {
  FaFeatherAlt,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaRegComment,
} from "react-icons/fa";
import { FiLink, FiArrowLeft } from "react-icons/fi";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant:
    | "tweet"
    | "refresh"
    | "back"
    | "destructive"
    | "like"
    | "reply"
    | "bookmark"
    | "share";
  active?: boolean;
  count?: string;
};

export default function IconButton({
  variant,
  active,
  count,
  ...props
}: ButtonProps) {
  const defaultClassNames = "rounded-full p-2 text-gray-400";
  let allClassNames;
  let icon;
  if (variant === "tweet") {
    allClassNames = `${defaultClassNames} bg-primary hover:bg-opacity-70 text-gray-50 p-3`;
    icon = <FaFeatherAlt size={24} />;
  } else if (variant === "refresh") {
    allClassNames = `${defaultClassNames} bg-primary hover:bg-opacity-70 text-gray-50`;
    icon = <BiRefresh size={40} />;
  } else if (variant === "back") {
    allClassNames = `${defaultClassNames} hover:bg-gray-800 text-gray-50`;
    icon = <FiArrowLeft />;
  } else if (variant === "destructive") {
    allClassNames = `${defaultClassNames} hover:bg-gray-700 hover:text-gray-100`;
    icon = <BsXLg size={18} />;
  } else if (variant === "like") {
    allClassNames = `${defaultClassNames} p-0 group flex items-center gap-1 hover:text-red-400 ${
      active ? "text-red-400" : null
    }`;
    icon = (
      <>
        <div className="rounded-full p-2 group-hover:bg-red-400/20">
          {active ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
        </div>
        <p>{count}</p>
      </>
    );
  } else if (variant === "reply") {
    allClassNames = `${defaultClassNames} p-0 group flex items-center gap-1 hover:text-green-400`;
    icon = (
      <>
        <div className="rounded-full p-2 group-hover:bg-green-400/20">
          <FaRegComment size={18} />
        </div>
        <p>{count}</p>
      </>
    );
  } else if (variant === "bookmark") {
    allClassNames = `${defaultClassNames} hover:text-primary hover:bg-primary/20 ${
      active && "text-primary"
    }`;
    icon = active ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />;
  } else if (variant === "share") {
    allClassNames = `${defaultClassNames} hover:bg-yellow-400/20 hover:text-yellow-400`;
    icon = <FiLink size={18} />;
  }

  return (
    <button {...props} className={allClassNames}>
      {icon}
    </button>
  );
}
