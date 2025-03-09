"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/utils/utils";
import AnimateHeight from "react-animate-height";
import { Draggable } from "@hello-pangea/dnd";
import { RiDraggable } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Trash2 } from "lucide-react";

const Dropdown = ({
  title,
  onClick,
  children,
  expanded,
  onTouchStart,
  onTouchMove,
  onDragStart,
  onDragMove,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
    console.log("haha");
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div>
      <div className=" relative m-0 p-0 z-0 ">
        <div>
          <div className="absolute left-0">Hej</div>

          <div
            className=" z-10 relative border-r border-l border-t border-t-gray-150 border-l-gray-150 border-r-gray-150 py-2 px-4  cursor-pointer flex justify-between items-center bg-white hover:bg-slate-200"
            onClick={onClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            draggable="true"
            onTouchStart={(e) => onTouchStart(e)}
            onTouchMove={(e) => onTouchMove(e)}
            onDragStart={(e) => onDragStart(e)}
            onDragOver={(e) => onDragMove(e)}
          >
            <div />
            <div
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className={
                title === "Ny sektion" ? "text-gray-300 z-0" : "text-black z-0"
              }
            >
              {title}
            </div>
            <div className=" relative">
              <div
                className={cn(
                  " text-black absolute right-8",
                  isHovering ? "flex" : "hidden"
                )}
              >
                <button type="button">
                  <CiEdit size={26} />
                </button>
                <button type="button">
                  <Trash2 color="red" />
                </button>
              </div>
              <IoIosArrowDown
                className={cn(
                  "transition-all duration-300",
                  expanded ? "rotate-360" : "rotate-180"
                )}
              />
            </div>
          </div>
        </div>
        <div
          className={cn(
            "overflow-hidden",
            expanded ? "default max-h-[1000px]" : "default max-h-[1px] "
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
