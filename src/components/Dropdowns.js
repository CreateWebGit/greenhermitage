"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/utils/utils";
import AnimateHeight from "react-animate-height";
import { Draggable } from "@hello-pangea/dnd";
import { RiDraggable } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Trash2 } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import Dragg from "react-draggable";
import InputCategoryName from "./InputCategoryName";

const Dropdown = ({
  title,
  onClick,
  children,
  expanded,
  categoryIndex,
  isSortable,

  handleRemove,
  setSortable,
  onTouchStart,
  onTouchMove,
  onDragStart,
  onDragMove,
  isActionOpen,
  setIsActionOpen,
  formField,
  setFormField,
  categoryID,
}) => {
  console.log("haha", categoryIndex);
  const [isHovering, setIsHovering] = useState(false);
  const [isDrag, setIsDrag] = useState(true);

  const [percent, setPercent] = useState(0);
  const [left, setLeft] = useState(0);
  const [isEditCategory, setEditCategory] = useState(false);
  const [isSetEdit, setSetEdit] = useState({ index: 500, edit: false });
  const [isCategoryName, setCategoryName] = useState(title);

  //const itemRef = useRef();
  //const actionRef = useRef();

  const handleSetEdit = () => {
    setLeft(0);
    setEditCategory(true);
  };

  const handleStart = (e, data) => {
    setIsDrag(false);
  };

  const handleClick = () => {
    console.log(isDrag, left);
    if (left !== 48) {
      setIsActionOpen(false);
      setLeft(0);
    } else {
      console.log("click");
    }
  };

  const handleStop = (e) => {
    if (percent > 1) {
      setIsActionOpen(true);
      const w = actionRef.current.offsetWidth;
      const leftWithAction = left > 0 ? w : w * -1;
      setLeft(leftWithAction);
    } else {
      setLeft(0);
    }

    setIsDrag(false);
  };

  const handleDrag = (e, data) => {
    const w = itemRef.current.offsetWidth;
    const x = data.x < 0 ? data.x * -1 : data.x;
    const p = (x / w) * 100;

    setPercent(p);
    setLeft(data.x);
  };

  const handleMouseOver = () => {
    if (window.innerWidth > 800) {
      setIsHovering(true);
    }
  };

  const handleMouseOut = () => {
    if (window.innerWidth > 800) {
      setIsHovering(false);
    }
  };
  return (
    <div
      className=""
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <Draggable
        draggableId={`${categoryIndex}`}
        index={categoryIndex}
        key={categoryIndex}
      >
        {(draggableProvider) => (
          <div className=" relative m-0 p-0 z-0 ml-0 mr-0 md:ml-12 md:mr-12 ">
            <div
              {...draggableProvider.draggableProps}
              ref={draggableProvider.innerRef}
            >
              <div
                className="absolute top-3 gap-3 right-0 px-3"

                /* ref={actionRef} */
              >
                <button type="button" onClick={handleSetEdit}>
                  <CiEdit size={26} />
                </button>
                <button type="button">
                  <Trash2 color="red" />
                </button>
              </div>

              <div
                className="absolute top-3 pl-8  z-50 h-full"
                {...draggableProvider.dragHandleProps}
              >
                {isSortable ? <RiDraggable /> : ""}
              </div>

              {/*
              <Dragg
                axis="x"
                handle=".item"
                defaultPosition={{ x: 0, y: 0 }}
                position={{ x: left, y: 0 }}
                onStart={handleStart}
                onDrag={handleDrag}
                onStop={handleStop}
                disabled={window.innerWidth > 800 ? true : false}
                bounds={{ right: 0 }}
                cancel=".btn"
              >
              */}
              <div
                className={cn(
                  "item z-10 relative border-r border-l border-t border-t-gray-150 border-l-gray-150 border-r-gray-150  cursor-pointer flex justify-between items-center bg-white hover:bg-slate-200",
                  isDrag ? " " : "transition-[transform] duration-1000 "
                )}
                /*  ref={itemRef} */
                style={{
                  transform: `translate3d(${left}px, 0, 0px)`,
                  transition: "all .1s",
                  transitionTimingFunction: "ease-in",
                }}

                //onClick={handleClick}
                //draggable="true"
                // onTouchStart={(e) => onTouchStart(e)}
                // onTouchMove={(e) => onTouchMove(e)}
                // onDragStart={(e) => onDragStart(e)}
                //onDragOver={(e) => onDragMove(e)}
              >
                <div />
                <div
                  // onTouchStart={(e) => e.stopPropagation()}
                  //  onTouchMove={(e) => e.stopPropagation()}

                  className="text-black z-0 btn w-full flex justify-center m-auto"
                  onClick={onClick}
                >
                  <InputCategoryName
                    name="categoryName"
                    value={isCategoryName}
                    isLabel={false}
                    isSetEdit={isSetEdit}
                    setSetEdit={setSetEdit}
                    onChange={(e) => setCategoryName(e.target.value)}
                    categoryIndex={categoryIndex}
                    formField={formField}
                    setFormField={setFormField}
                    categoryID={categoryID}
                  />
                </div>

                <div className=" relative">
                  <div
                    className={cn(
                      " text-black absolute right-[-70px]",
                      isHovering ? "flex" : "hidden"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSetEdit({ edit: true, index: categoryIndex });
                        console.log(isSetEdit);
                      }}
                    >
                      <CiEdit size={26} />
                    </button>
                    <button type="button">
                      <Trash2 color="red" />
                    </button>
                  </div>
                  <div className="flex justify-center items-center  pr-2">
                    <IoIosArrowDown
                      className={cn(
                        "transition-all duration-300",
                        expanded ? "rotate-360" : "rotate-180"
                      )}
                    />
                  </div>
                </div>
              </div>
              {/*</Dragg>*/}
            </div>

            <div
              className={cn(
                "overflow-hidden",
                isEditCategory
                  ? "default max-h-[1px] "
                  : expanded
                  ? "default max-h-[1000px]"
                  : "default max-h-[1px] "
              )}
            >
              {children}
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Dropdown;
