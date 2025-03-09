import { padNumberToString } from "@/utils/timeConverter";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const TimePickerDropdownItem = ({
  value,
  isSelected,
  onClick,
  onSelected,
  index,
}) => {
  let itemRef = useRef(null);

  useEffect(() => {
    if (itemRef && isSelected) {
      setTimeout(() => {
        const itemHeight = itemRef.current.getBoundingClientRect().height;
        console.log(itemHeight);
        onSelected(itemRef.current.offsetTop - itemHeight * 2);
        console.log(itemRef.current.offsetTop);
      }, 50);
    }
  });

  return (
    <div
      key={index}
      ref={itemRef}
      className={twMerge(
        "text-center text-xs text-white w-full cursor-pointer rounded-md flex items-center justify-center py-1 px-2 font-semibold hover:bg-white/10",
        isSelected && "bg-orange-800 hover:bg-orange-800"
      )}
      onClick={onClick}
    >
      {padNumberToString(value)}
    </div>
  );
};

export default TimePickerDropdownItem;
