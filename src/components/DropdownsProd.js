"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/utils/utils";
import AnimateHeight from "react-animate-height";
import { Draggable } from "@hello-pangea/dnd";
import { RiDraggable } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Trash2 } from "lucide-react";
import { CheckCheck } from "lucide-react";
import InputProductName from "./InputProductName";

const DropdownProd = ({
  title,
  price,
  index,
  field,
  onClick,
  children,
  expanded,
  categoryIndex,
  isSortable,
  setSortable,
  onTouchStart,
  onTouchMove,
  onDragStart,
  onDragMove,
  handeRemoveProduct,
}) => {
  console.log("haha", categoryIndex);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditProdName, setProdName] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
    console.log("haha");
  };

  const handleEditProdName = () => {
    setProdName(false);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div>
      <Draggable draggableId={`${index}`} index={index} key={index}>
        {(draggableProvider) => (
          <div
            className="w-full "
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <div className=" relative  m-0 z-0 md:ml-8 md:mr-12">
              <div
                {...draggableProvider.draggableProps}
                ref={draggableProvider.innerRef}
              >
                <div className="absolute left-0">Hej</div>

                <div
                  className="absolute top-3 pl-8 z-[999] h-full"
                  {...draggableProvider.dragHandleProps}
                >
                  <RiDraggable />
                </div>

                <div
                  className={cn(
                    " z-10 pl-16 pr-4 relative border-r border-l border-t border-b border-t-gray-150 border-l-gray-150 border-r-gray-150 py-2   cursor-pointer flex justify-between items-center bg-[#F7F7F7] ",
                    isEditProdName ? "" : "hover:bg-slate-100"
                  )}
                  draggable="true"
                  // onTouchStart={(e) => onTouchStart(e)}
                  onTouchMove={(e) => onTouchMove(e)}
                  // onDragStart={(e) => onDragStart(e)}
                  onDragOver={(e) => onDragMove(e)}
                >
                  <div
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                    onClick={isEditProdName ? null : onClick}
                    className="text-black z-0  w-full text-center"
                  >
                    <div className=" flex justify-between max-w-full m-auto ">
                      <div>{title}</div>
                      <div className="mr-4">{price} Kr</div>
                    </div>
                  </div>
                  <div className=" relative ">
                    <div
                      className={cn(
                        " text-black right-[-70px] z-50  absolute -top-1 h-[10px] w-[50px] ",
                        isEditProdName ? "flex" : isHovering ? "flex" : "hidden"
                      )}
                    >
                      {isEditProdName ? (
                        <button type="button">
                          <CheckCheck size={26} onClick={handleEditProdName} />
                        </button>
                      ) : (
                        <button type="button" onClick={() => setProdName(true)}>
                          <CiEdit size={26} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          handeRemoveProduct(field.categoryID, index)
                        }
                      >
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
                  expanded
                    ? "default max-h-[1000px]"
                    : "default max-h-[0px] overflow-hidden"
                )}
              >
                {children}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default DropdownProd;
