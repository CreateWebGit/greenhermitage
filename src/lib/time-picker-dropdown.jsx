import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { range } from "@/utils/timeConverter";
import style from "./time-picker-dropdown.module.css";
import TimePickerDropdownItem from "./time-picker-dropdown-item";

const TimePickerDropdown = ({
  isOpen,
  timeValues,
  setTimeValues,
  onConfirm,
}) => {
  let wrapperHoursRef = useRef(null);
  let wrapperMinutesRef = useRef(null);
  let wrapperSecoundsRef = useRef(null);

  const [currentScrollValueHours, setCurrentScrollValueHours] = useState(0);
  const [currentScrollValueMinutes, setCurrentScrollValueMinutes] = useState(0);
  const [currentScrollValueSecounds, setCurrentScrollValueSecounds] =
    useState(0);

  useEffect(() => {
    if (isOpen) {
      if (wrapperHoursRef)
        wrapperHoursRef.current.scrollTop = currentScrollValueHours;
      if (wrapperMinutesRef)
        wrapperMinutesRef.current.scrollTop = currentScrollValueMinutes;
      if (wrapperSecoundsRef)
        wrapperSecoundsRef.current.scrollTop = currentScrollValueSecounds;
    }
  });
  return (
    <div
      className={twMerge(
        "text-white absolute flex flex-col shadow-md bg-gray-950 rounded-lg mt-4 mx-auto h-fit w-64 items-center transition-all z-50 -translate-x-1/2 left-1/2",
        isOpen
          ? "max-h-96 border border-white/10 translate-y-0 opacity-100 duration-300 scale-100"
          : "max-h-0 border-transparent border-none translate-y-6 opacity-0 scale-75 overflow-hidden"
      )}
    >
      <div className="grid grid-cols-3 text-xs font-bold text-center border-b border-white/10 py-3 w-full">
        <p>hour</p>
        <p>minutes</p>
        <p>secounds</p>
      </div>
      <div className="grid grid-cols-3 text-xs font-bold text-center w-full overflow-hidden">
        <div
          ref={wrapperHoursRef}
          className={twMerge(
            "flex flex-col items-center gap-2 overflow-y-auto p-2 scroll-smooth",
            `${style.dropdown}`
          )}
        >
          {range(0, 23).map((value, index) => (
            <div key={index}>
              <TimePickerDropdownItem
                index={index}
                value={value}
                isSelected={timeValues.hour === value}
                onClick={() => {
                  setTimeValues((oldValues) => {
                    return { ...oldValues, hour: value };
                  });
                }}
                onSelected={(scrollValue) => {
                  if (isOpen) {
                    setCurrentScrollValueHours(scrollValue);
                  }
                }}
              />
            </div>
          ))}
        </div>
        <div
          ref={wrapperMinutesRef}
          className={twMerge(
            "flex flex-col items-center gap-2 overflow-y-auto p-2 scroll-smooth",
            `${style.dropdown}`
          )}
        >
          {range(0, 59).map((value, index) => (
            <div key={index}>
              <TimePickerDropdownItem
                index={index}
                value={value}
                isSelected={timeValues.minutes === value}
                onClick={() => {
                  setTimeValues((oldValues) => {
                    return { ...oldValues, minutes: value };
                  });
                }}
                onSelected={(scrollValue) => {
                  if (isOpen) {
                    setCurrentScrollValueMinutes(scrollValue);
                  }
                }}
              />
            </div>
          ))}
        </div>
        <div
          ref={wrapperSecoundsRef}
          className={twMerge(
            "flex flex-col items-center gap-2 overflow-y-auto p-2 scroll-smooth",
            `${style.dropdown}`
          )}
        >
          {range(0, 59).map((value, index) => (
            <div key={index}>
              <TimePickerDropdownItem
                index={index}
                value={value}
                isSelected={timeValues.secounds === value}
                onClick={() => {
                  setTimeValues((oldValues) => {
                    return { ...oldValues, secounds: value };
                  });
                }}
                onSelected={(scrollValue) => {
                  if (isOpen) {
                    setCurrentScrollValueSecounds(scrollValue);
                  }
                }}
              />
            </div>
          ))}
        </div>
        <div className="w-64 px-2 py-3 border-t border-white/50">
          <button
            className="text-xs text-white font-bold bg-orange-800 w-full h-8 rounded-md hover:bg-orange-700 transition-colors"
            onClick={onConfirm}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerDropdown;
