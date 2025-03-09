import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const MobileMenuItem = ({ icon: Icon, label, href }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/dashboard" && href === "/dashboard") || pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <div onClick={onClick}>
      <div className="flex justify-center">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
      </div>
      <div>{label}</div>
    </div>
  );
};

export default MobileMenuItem;
