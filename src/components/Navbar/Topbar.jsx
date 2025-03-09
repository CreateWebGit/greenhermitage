import { cn } from "@/utils/utils";
import React from "react";
import Contact from "./Contact";
import ReactCountryFlag from "react-country-flag";

const Topbar = ({ handleLangSv, handleLangEng, topbar }) => {
  return (
    <div className={cn(topbar ? "w-full" : "hidden")}>
      <div className="hidden md:flex justify-between h-12 m-auto items-center xl:w-[1200px]">
        <Contact />
        <div className="flex justify-end">
          <div className="pr-5 cursor-pointer" onClick={handleLangSv}>
            <ReactCountryFlag
              className="emojiFlag"
              countryCode="SE"
              style={{
                fontSize: "2em",
                lineHeight: "2em",
              }}
              aria-label="United States"
            />
          </div>
          <div className="pr-5 cursor-pointer" onClick={handleLangEng}>
            <ReactCountryFlag
              className="emojiFlag"
              countryCode="GB"
              style={{
                fontSize: "2em",
                lineHeight: "2em",
              }}
              aria-label="United States"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
