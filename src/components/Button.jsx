import { cn } from "@/utils/utils";
import Link from "next/link";
import React from "react";

const Button = ({ children, onClick, dark = true, url }) => {
  return (
    <Link
      href={url}
      onClick={onClick}
      className={cn(
        "w-[257px] py-3 rounded-md text-center",
        dark
          ? "bg-[#5F6952] text-white"
          : "bg-[#F2EEE3] border border-[#5F6952]"
      )}
    >
      {children}
    </Link>
  );
};

export default Button;
