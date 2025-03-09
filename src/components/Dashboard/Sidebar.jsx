import React from "react";
import { SidebarRoutes } from "./sidebar-routes";
import Logo from "./Logo";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="hidden md:flex h-screen w-56 flex-col fixed z-50 justify-between border-r">
      <div className="h-full flex flex-col overflow-y-auto bg-white">
        <div className="p-6">
          <Logo />
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
        </div>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/", redirect: true })}
        type="button"
        className="bg-white border-t flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-red-400  py-4"
      >
        <LogOutIcon size={22} />
        Logga ut
        <div className="ml-auto opacity-0 border-2 border-sky-700 h-full transition-all" />
      </button>
    </div>
  );
};

export default Sidebar;
