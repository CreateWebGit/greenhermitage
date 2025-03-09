"use client";
import {
  Layout,
  Building2,
  Clock4,
  LandPlot,
  UtensilsCrossed,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { routes } from "./navigation";

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full items-stretch justify-between h-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
