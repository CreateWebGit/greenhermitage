"use client";
import React, { useState } from "react";
import StarRating from "./Review/StarRating";
import { cn } from "@/utils/utils";
import { PiShootingStarFill } from "react-icons/pi";

const InputStar = ({
  name,
  value,
  label,
  isLabel = true,
  onChange,
  placeholder,
  isRating,
  setRating,
}) => {
  const [isColor, setColor] = useState("text-[#333]");
  let mycolor = "";
  return (
    <>
      <div className="mb-4 w-full">
        {isLabel ? (
          <div className="mb-2">
            <label>{label}</label>
          </div>
        ) : (
          ""
        )}
        <div className="flex bg-white">
          <div
            className={cn(
              "top-0 flex h-12 w-12 items-center justify-center rounded-bl-md rounded-tl-md border-y border-l",
              isColor ? isColor : "text-red-400"
            )}
          >
            <span>
              <PiShootingStarFill />
            </span>
          </div>

          <div
            onMouseEnter={() => setColor("text-red-500")}
            onMouseLeave={() => setColor("text-[#333]")}
            className=" w-[270px] bg-white rounded-sm border py-2 pl-2 text-[#9CA3B0] outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700"
          >
            <p className="text-[#9CA3B0] outline-transparent">
              Betygsätt din upplevelse:
            </p>
            <div className=" h-1 w-[70%] border-t" />
            <StarRating isRating={isRating} setRating={setRating} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InputStar;
