import React from "react";
import { routes } from "./navigation";
import MobileMenuItem from "./mobile-menu-item";

const MobileMenu = () => {
  return (
    <div className="flex fixed bottom-0 bg-white py-4  w-full justify-around shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] md:hidden">
      {routes.map((item, index) => {
        return (
          <div key={index} className="">
            <MobileMenuItem
              icon={item.icon}
              label={item.label}
              href={item.href}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MobileMenu;
