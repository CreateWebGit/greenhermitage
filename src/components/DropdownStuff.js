"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useRef } from "react";
import { cn } from "@/utils/utils";

const DropdownStuff = ({
  children,
  title,
  isSingelActive = false,
  isAllActive,
  setAllActive,
  mykey,
}) => {
  const [isActive, setActive] = useState(isSingelActive);

  const hanlde = () => {
    setActive(!isActive);
    setAllActive("nknkn");
  };

  return (
    <>
      <div className=" " key={mykey}>
        <div
          className={cn(
            "  overflow-hidden",
            isAllActive
              ? "h-[420px] transition-[height] duration-1000 ease-in-out"
              : "h-[0px] transition-[height] duration-1000 ease-in-out"
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default DropdownStuff;
