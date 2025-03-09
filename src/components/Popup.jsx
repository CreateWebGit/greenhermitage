import { cn } from "@/utils/utils";
import React, { useState } from "react";

const Popup = ({ children, isPopup, setPopup }) => {
  return (
    <div
      className={cn(
        "bg-slate-600/70 fixed top-0 bottom-0 left-0 right-0 justify-center items-center z-[999] ",
        isPopup ? "flex" : "hidden"
      )}
      type="button"
    >
      <div className="relative bg-white p-8 z-50 ml-56 min-h-[400px] min-w-[600px] rounded-md animate-wiggle">
        <div
          className="absolute top-3 right-3 z-50 cursor-pointer"
          onClick={() => setPopup(false)}
        >
          <div className="w-8 h-8 flex justify-center items-center p-1 rounded-full border border-slate-500 hover:bg-red-300">
            X
          </div>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
