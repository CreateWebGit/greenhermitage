"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { cn } from "@/utils/utils";

const DropdownProducts = ({
  children,
  title,
  isSingelActive = false,
  isAllActive,
  setAllActive,
  mykey,
  categoryIndex,
  productIndex,
  id,
  index,
  isActive,
  setActive,
}) => {
  //const [isActive, setActive] = useState(isAllActive);

  const hanlde = (e) => {
    setActive({ index: productIndex });
    // setAllActive(false);
    console.log(e);
  };

  console.log(isAllActive);
  console.log(isActive);

  return (
    <div className="flex flex-col grow w-full" key={mykey}>
      <div
        className="border border-gray-150 py-2 px-4 cursor-pointer flex justify-between items-center bg-white hover:bg-slate-200"
        onClick={() => hanlde(productIndex)}
      >
        <div
          className={title === "Ny sektion" ? "text-gray-300" : "text-black"}
        >
          {title}
          {isActive ? "singel - ja " : "singel - nej"}
          {isAllActive ? "all - ja " : "all - nej"}
          {productIndex}
        </div>
        <div>
          <IoIosArrowDown
            className={cn(
              "transition-all duration-300",
              isActive ? "rotate-360" : "rotate-180"
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "gap-4 transition-[max-height] duration-300 overflow-hidden",
          isActive.all == true
            ? "max-h-[0px]"
            : isActive.index === productIndex
            ? "max-h-[0px] "
            : ""
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownProducts;
