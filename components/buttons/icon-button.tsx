"use client";

import { ButtonHTMLAttributes, useMemo } from "react";
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
import TooltipWrapper from "@/components/tooltip";

export enum IconButtonVariant {
  Tweet = "Tweet",
  Back = "Go back",
  Close = "Close",
  Delete = "Delete",
  Like = "Like",
  Reply = "Reply",
  Bookmark = "Bookmark",
  Share = "Copy URL",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: IconButtonVariant;
  active?: boolean;
  count?: string;
}

export default function IconButton({
  variant,
  active,
  count,
  ...props
}: ButtonProps) {
  const { allClassNames, icon } = useMemo(() => {
    const defaultClassNames = "rounded-full text-gray-400";
    let variantClassNames = "";
    let icon;

    switch (variant) {
      case IconButtonVariant.Tweet:
        variantClassNames =
          "p-2 bg-primary hover:bg-opacity-70 text-gray-50 p-3";
        icon = <FaFeatherAlt size={24} />;
        break;
      case IconButtonVariant.Back:
        variantClassNames = "p-2 hover:bg-gray-800 text-gray-50";
        icon = <FiArrowLeft />;
        break;
      case IconButtonVariant.Close:
        variantClassNames = "p-2 hover:bg-gray-700 hover:text-gray-100";
        icon = <BsXLg size={18} />;
        break;
      case IconButtonVariant.Delete:
        variantClassNames = "p-2 hover:bg-gray-700 hover:text-gray-100";
        icon = <BsXLg size={18} />;
        break;
      case IconButtonVariant.Like:
        variantClassNames = `group flex items-center gap-1 hover:text-red-400 ${
          active ? "text-red-400" : ""
        }`;
        icon = (
          <>
            <div className="rounded-full p-2 group-hover:bg-red-400/20">
              {active ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
            </div>
            <p>{count}</p>
          </>
        );
        break;
      case IconButtonVariant.Reply:
        variantClassNames =
          "p-0 group flex items-center gap-1 hover:text-green-400";
        icon = (
          <>
            <div className="rounded-full p-2 group-hover:bg-green-400/20">
              <FaRegComment size={18} />
            </div>
            <p>{count}</p>
          </>
        );
        break;
      case IconButtonVariant.Bookmark:
        variantClassNames = `p-2 hover:text-primary hover:bg-primary/20 ${
          active ? "text-primary" : ""
        }`;
        icon = active ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />;
        break;
      case IconButtonVariant.Share:
        variantClassNames = "p-2 hover:bg-yellow-400/20 hover:text-yellow-400";
        icon = <FiLink size={18} />;
        break;
    }

    return {
      allClassNames: `${defaultClassNames} ${variantClassNames}`,
      icon,
    };
  }, [variant, active, count]);

  const button = (
    <button {...props} className={allClassNames} aria-label={variant}>
      {icon}
    </button>
  );

  if (variant === IconButtonVariant.Close) {
    return button;
  } else {
    return (
      <TooltipWrapper
        tooltipText={variant}
        side={variant === IconButtonVariant.Tweet ? "right" : "bottom"}
      >
        {button}
      </TooltipWrapper>
    );
  }
}
