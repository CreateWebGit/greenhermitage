"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useRef } from "react";
import { cn } from "@/utils/utils";

const Dropdown = ({
  children,
  title,
  isSingelActive = false,
  isAllActive,
  setAllActive,
  mykey,
  id,
  index,
  draggableProvider,
  draggable = false,
}) => {
  const [isActive, setActive] = useState(isSingelActive);

  const hanlde = () => {
    setActive(!isActive);
    setAllActive("nknkn");
  };

  return (
    <>
      {draggable ? (
        <div
          className=" "
          key={mykey}
          {...draggableProvider.draggableProps}
          {...draggableProvider.dragHandleProps}
          ref={draggableProvider.innerRef}
        >
          <div
            className="border border-gray-150 py-2 px-4 mb-2 cursor-pointer flex justify-between items-center bg-white hover:bg-slate-200"
            onClick={hanlde}
          >
            <div
              className={
                title === "Ny sektion" ? "text-gray-300" : "text-black"
              }
            >
              {title}
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
              " transition-[max-height] duration-300 overflow-hidden",
              isAllActive === "haha"
                ? "max-h-[0px] "
                : isActive
                ? "max-h-[100000px] "
                : "max-h-[0px] "
            )}
          >
            {children}
          </div>
        </div>
      ) : (
        <div className=" " key={mykey}>
          <div
            className="border border-gray-150 py-2 px-4 mb-2 cursor-pointer flex justify-between items-center bg-white hover:bg-slate-200"
            onClick={hanlde}
          >
            <div
              className={
                title === "Ny sektion" ? "text-gray-300" : "text-black"
              }
            >
              {title}
            </div>
            <div className="flex">
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
              " transition-[max-height] duration-300 overflow-hidden",
              isAllActive === "haha"
                ? "max-h-[0px] "
                : isActive
                ? "max-h-[100000px] "
                : "max-h-[0px] "
            )}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
